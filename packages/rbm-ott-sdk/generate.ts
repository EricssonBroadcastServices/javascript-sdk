import { mkdirSync, readFileSync, rmdirSync, writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";

const INPUT_FILE = resolve(process.cwd(), "./exposure-spec.json")
const FORMATTED_SPEC = resolve(process.cwd(), "./exposure-spec-patched.json")
const OUTPUT_PATH = resolve(process.cwd(), "./generated");
const FILE_PREFIX = `/* eslint-disable */
/* tslint:disable */
/*
 * ----------------------------------------------------------------
 * ## THIS FILE IS GENERATED FROM THE RED BEE MEDIA OPENAPI SPEC ##
 * ## DO NOT EDIT IT DIRECTLY                                    ##
 * ----------------------------------------------------------------
 */

`;

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

let spec = JSON.parse(data);

// Delete the info and servers spec
delete spec.info;
delete spec.servers;

/**
 * Process components.schemas
 */

// Delete custom string schema (useless wrapperaround string)
delete spec.components.schemas.string

// Fix invalid names that would lead to bad type names
for (let [originalName, schemasSpec] of Object.entries(spec.components.schemas)) {
  const name = formatTypeName(originalName);
  if (name !== originalName) {
    console.log(`Renaming schema key "${originalName}" => "${name}"`);
    spec.components.schemas[name] = schemasSpec;
    delete spec.components.schemas[originalName];
  }
}

// Move enum declarations inside of properties to their own separate declarations (to later deduplicate enums)
for (let [path, schemaName] of Object.entries(enumTranslationTable)) {
  const [currentSchema, currentProp] = path.split(".");
  const propSpec = spec.components.schemas?.[currentSchema]?.properties?.[currentProp];
  if (propSpec.type === "string" && propSpec.enum && !spec.components.schemas[schemaName]) {
    spec.components.schemas[schemaName] = { enum: propSpec.enum, type: propSpec.type };
    console.log(`Creating separate schema "${schemaName}" from property enum "${currentSchema}.${currentProp}"`);
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


const getVoidRoutes: string[] = [];
const unhandledEnumTypes: Record<string, string> = {};

for (let [name, schemasSpec] of Object.entries(spec.components.schemas) as [string, any][]) {
  for (let [propName, propSpec] of Object.entries(schemasSpec?.properties || {}) as [string, any][]) {
    if (propSpec.type === "string" && propSpec.enum) {
      const dataStr = JSON.stringify(propSpec.enum.sort());
      let refName = "";
      if (ENUM_SCHEMAS.has(dataStr)) {
        refName = ENUM_SCHEMAS.get(dataStr) as string; // typescript is stupid
        console.log(`Deduplicating enum: "${name}.${propName}" => ${refName}`);
      } else {
        unhandledEnumTypes[`${name}.${propName}`] = dataStr;
      }
      if (refName) {
        propSpec.$ref = `#/components/schemas/${refName}`;
        delete propSpec.enum;
        delete propSpec.type;
      }
    }
  }
}

console.log("Unhandled enum types (will be declared inline on the property):", unhandledEnumTypes);

/* Mark properties as non-optional */
spec.components.schemas.AssetList.required = ["items", "pageNumber", "pageSize", "totalCount"];
spec.components.schemas.Asset.required = ["assetId", "audioTracks", "changed", "collections", "created", "cuePoints", "customData", "duration", "externalReferences", "linkedEntities", "live", "localized", "markerPoints", "markers", "parentalRatings", "participants", "productionCountries", "publications", "slugs", "spokenLanguages", "subtitles", "tags", "type"];
spec.components.schemas.Program.required = ["endTime", "startTime"];

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
spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/auth/login"].post.operationId = "loginAnonymous"

// delete the api docs and export endpoints
delete spec.paths["/docs/api-docs/{api}"];
delete spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/export/asset"];
// deprecated and unused (we use newer versions of these)
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

for (let [path, methods] of Object.entries(spec.paths) as [string, any][]) {
  for (let [methodType, methodSpec] of Object.entries(methods || {}) as any[]) {
    // Remove extra space around description and summary
    if (methodSpec.description) {
      methodSpec.description = methodSpec.description.trim();
    }
    if (methodSpec.summary) {
      methodSpec.summary = methodSpec.summary.trim();
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
          schema.$ref = `#/components/schemas/${refName}`;
          delete schema.enum;
          delete schema.type;
        } else {
          console.log(`Path param enum: ${name}: ${dataStr}`);
        }
      }
    }
    for (let response of Object.values(methodSpec.responses) as any[]) {
      for (let mimetypeResponse of Object.values(response?.content || {}) as any[]) {
        if (mimetypeResponse.schema?.items?.$ref === "#/components/schemas/string") {
          console.log(`Replacing custom 'string' schema with string`);
          delete mimetypeResponse.schema.items.$ref;
          mimetypeResponse.schema.items.type = "string";
        }
      }
    }
    const content = methodSpec.responses["200"]?.content || methodSpec.responses.default?.content || {};
    if (methodType === "get" && !Object.keys(content).length) {
      getVoidRoutes.push(`${methodSpec.tags[0]}.${methodSpec.operationId} (${path})`);
    }
  }
}

if (getVoidRoutes.length) {
  const formattedRoutes = ["", ...getVoidRoutes].join("\n -  ");
  console.warn(`\n⚠️   The following GET routes do not specify a return type specification, and will be declared as void:${formattedRoutes}\n`);
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
    onInit(config) {
      // Must override hard coded base path which swagger-typescript-api uses for some templates
      config.templatePaths.base = resolve(process.cwd(), "./templates/base");
      return config;
    },
    onParseSchema(originalSchema, parsedSchema) {
      const { fieldSet } = originalSchema?.properties || {};
      if (fieldSet) {
        originalSchema.partial = true;
        parsedSchema.content = parsedSchema.content.filter((param: any) => {
          return !["fieldSet", "includeFields", "excludeFields"].includes(param.name);
        });
      }
      return parsedSchema;
    },
    onFormatRouteName (routeInfo) {
      // allow duplicates for search (because we did before)
      if (["searchV2", "searchV3", "getSystemConfigV2"].includes(routeInfo.operationId)) {
        return routeInfo.operationId
      }

      // strip remaining "v1", "v2", "v3" and "_1" (mostly suffixes,but a couple of times in the middle of the names)
      const cleanedId = routeInfo.operationId.replace(/[_vV]?\d/, "");

      if (cleanedId.endsWith("Get")) { // Normalize Yoda names
        return `get${cleanedId.charAt(0).toUpperCase()}${cleanedId.slice(1, -3)}`;
      }
      return cleanedId;
    },
    onPrepareConfig(apiConfig) {
      const dupes = [...apiConfig.config.routeNameDuplicatesMap].filter(([, val]) => Number(val) > 1);
      if (dupes.length) {
        throw new Error(`Duplicate routs found: ${dupes}`);
      }
    },
  }
})
  .then(({configuration, files}) => {
    rmdirSync(OUTPUT_PATH, { recursive: true});
    mkdirSync(OUTPUT_PATH);
    // Delete the temporary formatted spec
    unlinkSync(FORMATTED_SPEC);
    // Write generated files
    files.forEach(({ fileName, fileContent }) => {
      writeFileSync(`${OUTPUT_PATH}/${fileName}.ts`, FILE_PREFIX + fileContent);
    });
    // Create and write an index file
    let importStatements: Record<string, string> = { "http-client": "ServiceContext" };
    let serviceNames: string[] = [];
    let typeDeclarations: string[] = [];
    let props: string[] = [];

    for (let moduleName of (configuration.routes.combined || []).map(({ moduleName }) => moduleName).sort()) {
      const PascalName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
      const serviceName = PascalName + "Service";
      importStatements[PascalName] = serviceName;
      serviceNames.push(serviceName);
      typeDeclarations.push(`${moduleName}: ReturnType<typeof ${serviceName}>`);
      props.push(`this.${moduleName} = ${serviceName}(context)`);
    }
    const allImports = Object.entries(importStatements).sort().map(([fileName, module]) => `import { ${module} } from "./${fileName}"`).join("\n");
    const indexFileData = `${allImports}\n\nclass APIService {\n  ${typeDeclarations.join(";\n  ")}\n  constructor(public context: ServiceContext) {\n    ${props.join(";\n    ")}\n  }\n}\n\nexport { ${serviceNames.join(", ")} };\nexport default APIService;\nexport * from \"./data-contracts\";\n`;

    writeFileSync(`${OUTPUT_PATH}/index.ts`, indexFileData, "utf8");
  })
  .catch((err: any) => console.error(err))
