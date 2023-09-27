import { mkdirSync, readFileSync, rmSync, writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";

/**
 * This script generates the SDK from the OpenAPI spec.
 * 
 * It does the following:
 * - Fixes / formats some names that would otherwise result in bad method or type names
 * - Remove number suffixes from method names (ex "changeEmailV3" or "get_1")
 * - Remove "API" prefix from type names
 * - Remove endpoints that are unsuited for this SDK (unused, deprecated, experimental or HTTP redirecting to a file)
 * 
 * This is accomplished by a combination of:
 * - Manual pre-processing of the spec JSON
 * - Arguments and hooks to the generateApi function from swagger-typescript-api
 * - Custom templates for eth swagger-typescript-api using custom EJS templates (see ./templates)
 * - Manually writing the index.ts file from the AST from swagger-typescript-api
 * 
 * One of the complicated things we handle in pre-processing is moving types that are declared inline on the routes
 * to their own separate type declarations and then de-duplicating them to avoid generating duplicate types.
 * 
 * We also do the opposite and move request types that are declared in components.schemas to the routes so that it will
 * not generate lots of named types for partial request params that are only used in one method.
 * 
 */

const SCHEMA_PREFIX = "#/components/schemas/";
const INPUT_FILE = resolve(process.cwd(), "./exposure-spec.json")
const FORMATTED_SPEC = resolve(process.cwd(), "./exposure-spec-patched.json")
const OUTPUT_PATH = resolve(process.cwd(), "./generated");

// Warning prefix to add to all the generated files
const FILE_PREFIX = `/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

`;

const tagNameCasingTable: Record<string, string> = {
  "clientconfig": "clientConfig",
  "customerconfig": "customerConfig",
  "eventsink": "eventSink",
  "userplayhistory": "userPlayHistory",
}

// Map of recurring enum types (value) inside of existing interfaces to extract to their own declarations
// These are later used to deduplicate
const enumTranslationTable: Record<string, string> = {
  "AppStorePurchaseVerifyResponse.transactionStatus": "StoreTransactionStatus",
  "Asset.materialType": "AssetMaterialType",
  "Asset.type": "AssetType",
  "Device.type": "DeviceType",
  "Image.orientation": "ImageOrientation",
  "IsEntitledResponse.status": "EntitlementStatus",
  "MediaFormat.format": "MediaFormatType",
  "ProductOfferingPurchase.status": "ProductOfferingPurchaseStatus",
}

function formatTypeName(name: string) {
  // Remove useless Api prefix
  if (name.startsWith("Api")) {
    name = `${name.charAt(3).toUpperCase()}${name.slice(4)}`;
  }
  // Replace spaces with uppercasing the next letter (like camelCaseor PascalCase, but doesn't touch the first letter)
  // We need this to avoid generating type names like "User_details" or "User20Details"
  return name.split(" ").map((word, index) => (index ? word[0].toUpperCase() : word[0]) + word.slice(1)).join("");
}

let data = readFileSync(INPUT_FILE, "utf-8");
data = data.replaceAll("customerUnit", "customer") // fix inconsistent naming of "customer" param
data = data.replaceAll("frirslogin awgane", "firebase login") // just a comment type
data = data.replaceAll(/\s*<p>\s*/g, "") // strip <p> in comments
data = data.replaceAll(/\s*<br>\s*/g, "\\n") // replace <br> with space
data = data.replaceAll(/\s*\\n\s*/g, "\\n"); // strip spaces around line breaks
data = data.replaceAll(/(?<="#\/components\/schemas\/)[^"]*/g, formatTypeName);
// delete references to useless schemas wrapping and shadowing native types
// these would otherwise generate useless types like `type String = string`
data = data.replaceAll(/\"\$ref\"\s*:\s*\"#\/components\/schemas\/string\"/g, '"type" : "string"');
data = data.replaceAll(/\"\$ref\"\s*:\s*\"#\/components\/schemas\/Map\"/g, '"description": "A key value object", "type" : "object"');
data = data.replaceAll(/\"\$ref\"\s*:\s*\"#\/components\/schemas\/Object\"/g, '"type" : "object"');

let spec = JSON.parse(data);

// Delete the info and servers spec
delete spec.info;
delete spec.servers;

/**
 * Process components.schemas
 */

function getRefSpec(path?: string) {
  if (path?.startsWith(SCHEMA_PREFIX)) {
    return spec.components.schemas?.[path.slice(SCHEMA_PREFIX.length)];
  }
}

// Fix invalid names that would lead to bad type names
for (let [originalName, schemasSpec] of Object.entries(spec.components.schemas)) {
  const name = formatTypeName(originalName);
  if (name !== originalName) {
    // Only log the significant renames
    if (`Api${name}` !== originalName) {
      console.log(`Renaming schema key "${originalName}" => "${name}"`);
    }
    spec.components.schemas[name] = schemasSpec;
    delete spec.components.schemas[originalName];
  }
}

// Move enum declarations inside of properties to their own separate declarations (to later deduplicate them)
for (let [path, schemaName] of Object.entries(enumTranslationTable)) {
  const [currentSchema, currentProp] = path.split(".");
  const propSpec = spec.components.schemas?.[currentSchema]?.properties?.[currentProp];
  if (propSpec?.type === "string" && propSpec.enum && !spec.components.schemas[schemaName]) {
    spec.components.schemas[schemaName] = { enum: propSpec.enum, type: propSpec.type };
    console.log(`Copying property enum "${currentSchema}.${currentProp}" to separate schema "${schemaName}"`);
  } else {
    console.warn(`⚠️  Could not find "${currentSchema}.${currentProp}" to create separate schema "${schemaName}"`);
  }
}

// Create reference map for deduplicating enums by value
const ENUM_SCHEMAS = new Map<string, string>()

for (let [name, schemasSpec] of Object.entries(spec.components.schemas) as [string, any][]) {
  if (schemasSpec.type === "string" && schemasSpec.enum) {
    // dataStr effectively works as a hash for type deduplication, because all the data is sorted
    const dataStr = JSON.stringify(schemasSpec.enum.sort());
    if (ENUM_SCHEMAS.has(dataStr)) {
      console.warn(`Found duplicate enum schemas: ${name}, ${ENUM_SCHEMAS.get(dataStr)}`);
    } else {
      ENUM_SCHEMAS.set(dataStr, name);
    }
  }
}

const untypedRoutes: string[] = [];
const unhandledComponentEnums: Record<string, string> = {};

// Replace enums in properties with the ones declared in the schema if they have the same values
for (let [name, schemasSpec] of Object.entries(spec.components.schemas) as [string, any][]) {
  for (let [propName, propSpec] of Object.entries(schemasSpec?.properties || {}) as [string, any][]) {
    if (propSpec.type === "string" && propSpec.enum) {
      const dataStr = JSON.stringify(propSpec.enum.sort());
      let refName = "";
      if (ENUM_SCHEMAS.has(dataStr)) {
        refName = ENUM_SCHEMAS.get(dataStr) as string; // typescript is stupid
        console.log(`Deduplicating enum: "${name}.${propName}" => ${refName}`);
      } else {
        unhandledComponentEnums[`${name}.${propName}`] = dataStr;
      }
      if (refName) {
        propSpec.$ref = `${SCHEMA_PREFIX}${refName}`;
        delete propSpec.enum;
        delete propSpec.type;
      }
    }
  }
}

/* Mark properties as non-optional */
spec.components.schemas.AssetList.required = ["items", "pageNumber", "pageSize", "totalCount"];
spec.components.schemas.Asset.required = ["assetId", "audioTracks", "changed", "collections", "created", "cuePoints", "customData", "duration", "externalReferences", "linkedEntities", "live", "localized", "markerPoints", "markers", "parentalRatings", "participants", "productionCountries", "publications", "slugs", "spokenLanguages", "subtitles", "tags", "type"];
spec.components.schemas.Program.required = ["endTime", "startTime"];
spec.components.schemas.StoreAppStoreReference.required = ["productId"];
spec.components.schemas.StoreGooglePlayReference.required = ["skuId"];
spec.components.schemas.Publication.required = ["toDate", "publicationId", "publicationDate", "products", "fromDate", "countries"];
spec.components.schemas.ChannelEPGResponse.required = ["channelId", "programs", "totalHitsAllChannels"]
spec.components.schemas.RecommendedWatchNext.required = ["items"]
spec.components.schemas.Event.required = ["asset", "assetId", "startTime", "endTime"];
spec.components.schemas.AssetListItemResponse.required = ["asset", "assetId"];
spec.components.schemas.ProgramResponse.required = ["asset", "assetId", "endTime", "startTime", "programId"];

/* Fix types */
spec.components.schemas.PaymentProvider = {"type": "string", "enum": ["stripe", "googleplay", "appstore", "external", "deny"]};
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/entitle"].get.parameters.find((param: any) => param.name === "paymentProvider").schema = { "$ref": "#/components/schemas/PaymentProvider" };

/**
 * Process paths
 */

// Fix/improve duplicate or bad names
spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/location"].get.operationId = "getLocation"
spec.paths["/v2/location"].get.operationId = "getLocationFromReferer"
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/store/account/purchases"].get.operationId = "getPurchaseTransactions"
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase"].get.operationId = "getOfferingPurchases"
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}"].get.operationId = "getOfferingsByCountry"
spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/time"].get.operationId = "getTime"
spec.paths["/v2/time"].get.operationId = "getTimeAnonymous"
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous"].post.operationId = "loginAnonymous"

// delete the api docs and export endpoints
delete spec.paths["/docs/api-docs/{api}"];
delete spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/export/asset"];
// delete 307 redirect endpoint (cannot be used in an SDK)
delete spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/thumbnail"];
// deprecated and unused (we use newer versions of these)
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/auth/login"].post;
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/changeEmail"].put;
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/changePassword"].put;
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/delete"].post;
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/signup"].post;
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/signup/password/{token}"].put;
// duplicate,experimantal and marked as unused
delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/config/{fileName}"].get

// unsure, but I don't think we use these?
delete spec.paths["/eventsink/init"];
delete spec.paths["/eventsink/send"];

// doesn't specify any return type schema, and doesn't seem to work anyway (always returns "Unknown error" 500)
delete spec.paths["/v3/customer/{customer}/businessunit/{businessUnit}/content/search/participant/query/{query}"].get;


const unhandledPathEnums = new Set<string>();
for (let [path, methods] of Object.entries(spec.paths) as [string, any][]) {
  for (let [methodType, methodSpec] of Object.entries(methods || {}) as any[]) {
    const firstTag = methodSpec.tags?.[0];
    if (firstTag) { // fix casing
      methodSpec.tags[0] = tagNameCasingTable[firstTag] || firstTag;
    } else {
      throw new Error(`Missing tag for ${methodType.toUpperCase()} ${methodSpec.operationId} (${path})`);
    }
    // Remove extra space around description and summary
    if (methodSpec.description) {
      methodSpec.description = methodSpec.description.trim();
    }
    if (methodSpec.summary) {
      methodSpec.summary = methodSpec.summary.trim();
    }
    const requestBodySchema = methodSpec.requestBody?.content?.["application/json"].schema;
    // For arrays use the item instead
    const schemaContext = requestBodySchema?.items || requestBodySchema;
    let refSpec;
    if (refSpec = getRefSpec(schemaContext?.$ref)) {
      delete schemaContext.$ref;
      Object.assign(schemaContext, refSpec);
    }
    for (let { name, schema } of (methodSpec?.parameters || []) as any[]) {
      // fix invalid type "ref"
      if (schema?.type === "ref") {
        schema.type = "string";
      }
      // Deduplicate enums in path spec
      if (schema?.enum && schema.type === "string") {
        const dataStr = JSON.stringify(schema.enum.sort());
        const refName = ENUM_SCHEMAS.get(dataStr);
        if (refName) {
          console.log(`Deduplicating path enum: "${name}.${name}" => ${refName}`);
          schema.$ref = `${SCHEMA_PREFIX}${refName}`;
          delete schema.enum;
          delete schema.type;
        } else if (!["fieldSet"].includes(name)) { // Ignore fieldset
          unhandledPathEnums.add(`${name}: ${dataStr}`);
        }
      }
    }
    const content = methodSpec.responses["200"]?.content || methodSpec.responses.default?.content || {};
    if (!Object.keys(content).length) {
      untypedRoutes.push(`${methodType.toUpperCase()} ${methodSpec.tags[0]}.${methodSpec.operationId} (${path})`);
    }
  }
}

const unusedComponents: string[] = [];

// Removes unused components which would otherwise generate types/interfaces we don't need
(function treeShakeSchemas() {
  // stringify the whole spec so we can use simple string.includes() to check for references
  const data = JSON.stringify(spec);
  const currentUnusedComponents = Object.keys(spec.components.schemas).filter(name => !data.includes(`${SCHEMA_PREFIX}${name}`));
  unusedComponents.push(...currentUnusedComponents);

  for (let name of currentUnusedComponents) {
    delete spec.components.schemas[name];
  }
  // If we found and removed unreferenced components, keep checking in case those
  // components referenced other, now unreferenced components
  if (currentUnusedComponents.length) {
    treeShakeSchemas();
  }
})();

if (Object.keys(unhandledComponentEnums).length) {
  console.log(`\n⚠️   TYPE enums which will be left declared inline and will not be deduplicated:`);
  console.log(Object.entries(unhandledComponentEnums).map(([name, dataStr]) => `  - ${name}: ${dataStr}`).join("\n"));
}

if (unhandledPathEnums.size) {
  console.log(`\n⚠️   ROUTE enums which will be left declared inline and will not be deduplicated:\n - ${Array.from(unhandledPathEnums).join("\n - ") }`);
}

if (untypedRoutes.length) {
  const formattedRoutes = ["", ...untypedRoutes.sort()].join("\n -  ");
  console.warn(`\n⚠️   Endpoints which do not specify a return type specification. They will return a HTTP fetch response interface rather than the typed data from the response:${formattedRoutes}`);
}

if (unusedComponents.length) {
  console.log(`\nPruned unreferenced components (would create unused types): ${unusedComponents.join(", ")}\n`);
}

// De-comment to add recursive sorting the whole spec (this is not needed,
// but is good for diffing the result between diffeent imports)
// import sortKeysRecursive from "sort-keys-recursive";
// spec = sortKeysRecursive(spec)

writeFileSync(FORMATTED_SPEC, JSON.stringify(spec, null, 2), "utf8");

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  output: false, // Don't write files (handle that ourselves later)
  input: resolve(process.cwd(), FORMATTED_SPEC),
  templates: resolve(process.cwd(), './templates'),
  defaultResponseAsSuccess: true, // We need this because we sometimes use "default" as a server status code for 2xx
  generateClient: true, // Otherwise we just generate the data-contract file
  generateResponses: true, // This puts the server error code in the method docblock
  extractEnums: false, // We already do this for the enums in the enumTranslationTable. Don't want to do it for all values that are enums.
  enumKeySuffix: "",
  unwrapResponseData: true, // Return the data directly, instead of HttpResponse with a data property
  //defaultResponseType: "void",
  //singleHttpClient: true,
  // cleanOutput: true, // we manually delete and recreate the dir now
  modular: true,
  moduleNameFirstTag: true,
  sortTypes: true,
  sortRoutes: true,
  hooks: {
    onFormatRouteName (routeInfo) {
      // allow duplicates for search (because we did before)
      if (["searchV2", "searchV3", "getSystemConfigV2"].includes(routeInfo.operationId)) {
        return routeInfo.operationId
      }

      // strip remaining "v1", "v2", "v3" and "_1" (mostly suffixes, but a couple of times in the middle of the names)
      const cleanedId = routeInfo.operationId.replace(/[_vV]?\d/, "");

      if (cleanedId.endsWith("Get")) { // Normalize Yoda names
        return `get${cleanedId.charAt(0).toUpperCase()}${cleanedId.slice(1, -3)}`;
      }
      return cleanedId;
    },
    onPrepareConfig(apiConfig) {
      const dupes = [...apiConfig.config.routeNameDuplicatesMap].filter(([, val]) => Number(val) > 1);
      if (dupes.length) {
        // If you get this error either delete unwanted duplicate routes in the pre-processing step:
        // (`delete spec.paths[...].get`), or add it to the exceptions (`onFormatRouteName` hook)
        throw new Error(`Duplicate routes found after renaming: ${dupes}`);
      }
    },
  }
})
  .then(({configuration, files}) => {
    // Generate index file data
    let moduleNames: Record<string, string> = {};
    let typeDeclarations: string[] = [];
    let props: string[] = [];

    for (let moduleNS of (configuration.routes.combined || []).map(({ moduleName }) => moduleName).sort()) {
      const PascalName = moduleNS.charAt(0).toUpperCase() + moduleNS.slice(1);
      const moduleName = PascalName + "Service";
      moduleNames[PascalName] = moduleName;
      typeDeclarations.push(`${moduleNS}: ${moduleName}`);
      props.push(`this.${moduleNS} = new ${moduleName}(context)`);
    }
    const exports = Object.values(moduleNames).map((fileName) => `export * from "./${fileName}"`).join(";\n");
    const importStatements = ["http-client", ...Object.values(moduleNames)].sort(Intl.Collator().compare).map(name => [name, name === "http-client" ? "request, ServiceContext" : name ]);
    const imports = importStatements.map(([fileName, module]) => `import { ${module} } from "./${fileName}"`).join(";\n");
    const fileContent = `${imports};\n\nclass RBMOTTSDK {\n  ${typeDeclarations.join(";\n  ")};\n  constructor(public context: ServiceContext) {\n    ${props.join(";\n    ")};\n  }\n}\n\nexport default RBMOTTSDK;\nexport { request, ServiceContext };\nexport * from \"./data-contracts\";\n${exports};\n`;

    files.push({ fileName: "index", fileExtension: "ts", fileContent });

    // Delete the temporary formatted spec
    unlinkSync(FORMATTED_SPEC);
    // Clear output path
    rmSync(OUTPUT_PATH, { recursive: true });
    mkdirSync(OUTPUT_PATH);
    // Write generated files
    files.forEach(({ fileName, fileContent }) => {
      // Add a suffix to the service modules only, not the data-contracts or http-client
      writeFileSync(`${OUTPUT_PATH}/${moduleNames[fileName] || fileName}.ts`, FILE_PREFIX + fileContent);
    });
  })
  .catch((err: any) => console.error(err))
