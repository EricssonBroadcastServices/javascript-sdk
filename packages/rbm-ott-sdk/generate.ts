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

/* Keep all patches that really should be fixed in the back-end in one place to make it easier to forward the info to the BE-team later */
function patchSpec(data: string): string {
  const renameTypes = {
    AdClips: "AdClip", // Because it's one clip, not a list
  }
  data = data.replaceAll("customerUnit", "customer"); // fix inconsistent naming of "customer" param
  data = data.replaceAll("frirslogin awgane", "firebase login"); // just a comment typo

  // delete references to useless schemas wrapping and shadowing native types
  // these would otherwise generate useless types like `type String = string`
  data = data.replaceAll(/\"\$ref\"\s*:\s*\"#\/components\/schemas\/string\"/g, '"type" : "string"');
  data = data.replaceAll(
    /\"\$ref\"\s*:\s*\"#\/components\/schemas\/Map\"/g,
    '"description": "A key value object", "type" : "object"'
  );
  data = data.replaceAll(/\"\$ref\"\s*:\s*\"#\/components\/schemas\/Object\"/g, '"type" : "object"');

  // Override duplicate asset schemas/interfaces that in turn duplicate the whole type tree
  data = data.replaceAll(
    /#\/components\/schemas\/(UPHAsset|AssetResponse|ApiContinueWatchingAsset)/g,
    `${SCHEMA_PREFIX}Asset`
  );

  for (let [oldName, newName] of Object.entries(renameTypes)) {
    data = data.replaceAll(`${SCHEMA_PREFIX}${oldName}`, `${SCHEMA_PREFIX}${newName}`);
  }

  const spec = JSON.parse(data);

  for (let [oldName, newName] of Object.entries(renameTypes)) {
    spec.components.schemas[newName] = spec.components.schemas[oldName]
  }

  // Fix incorrect return types that shouldn't be arrays:
  fixFalseListSchema(
    spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/userplayhistory/lastviewedoffset"].get.responses[
      "200"
    ]
  );
  fixFalseListSchema(
    spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag"].get.responses["200"]
  );

  // Add missing return type ApiLoginResponse for oauthLogin
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/auth/oauthLogin"].post.responses.default.content[
    "application/json"
  ] = { schema: { $ref: "#/components/schemas/ApiLoginResponse" } };

  /* Mark properties as non-optional */
  spec.components.schemas.ApiAssetList.required = ["items", "pageNumber", "pageSize", "totalCount"];
  spec.components.schemas.ApiAsset.required = [
    "assetId",
    "audioTracks",
    "changed",
    "collections",
    "created",
    "cuePoints",
    "customData",
    "duration",
    "externalReferences",
    "linkedEntities",
    "live",
    "localized",
    "markerPoints",
    "markers",
    "parentalRatings",
    "participants",
    "productionCountries",
    "publications",
    "slugs",
    "spokenLanguages",
    "subtitles",
    "tags",
    "type"
  ];
  spec.components.schemas.ApiProgram.required = ["endTime", "startTime"];
  spec.components.schemas.ApiStoreAppStoreReference.required = ["productId"];
  spec.components.schemas.ApiStoreGooglePlayReference.required = ["skuId"];
  spec.components.schemas.ApiPublication.required = [
    "toDate",
    "publicationId",
    "publicationDate",
    "products",
    "fromDate",
    "countries"
  ];
  spec.components.schemas.ApiChannelEPGResponse.required = ["channelId", "programs", "totalHitsAllChannels"];
  spec.components.schemas.ApiRecommendedWatchNext.required = ["items"];
  spec.components.schemas.ApiEvent.required = ["asset", "assetId", "startTime", "endTime"];
  spec.components.schemas.ApiAssetListItemResponse.required = ["asset", "assetId"];
  spec.components.schemas.ApiProgramResponse.required = ["asset", "assetId", "endTime", "startTime", "programId"];
  spec.components.schemas.ApiStorePriceTag.required = ["fractionDigits", "currency", "amount"];
  spec.components.schemas.ApiStoreProductOffering.required = [
    "productOfferingId",
    "id",
    "localizedMetadata",
    "productRequiresSelectAsset",
    "productOfferingType",
    "productIds",
    "offeringPrice",
    "paymentMethodTypes",
    "salesStart"
  ];
  spec.components.schemas.ApiStoreProductOfferingPrice.required = ["price"];
  spec.components.schemas.ApiUserDetailsResponse.required = [
    "username",
    "defaultLanguage",
    "child",
    "capabilities",
    "attributes"
  ];
  spec.components.schemas.ApiUserAttributeResponse.required = [
    "attributeId",
    "type",
    "requiredAtSignup",
    "valueSet",
    "localized"
  ];
  spec.components.schemas.ApiUserCapabilities.required = [
    "canChangeEmail",
    "canChangePassword",
    "canChangeUserNameAndEmail",
    "canManageAccount",
    "canManageDevices",
    "canManagePayments",
    "canManagePurchases"
  ];
  spec.components.schemas.Product.required = ["id", "name", "entitlementRequired", "blocked", "anonymousAllowed"];
  spec.components.schemas.ApiTagList.required = ["items", "pageSize", "pageNumber", "totalCount"];
  spec.components.schemas.ApiTagType.required = ["tagId", "scheme", "localized"];
  spec.components.schemas.ApiImage.required = ["orientation", "url", "width", "height"];
  spec.components.schemas.ApiLocalizedData.required = ["locale"];
  spec.components.schemas.ApiLocalizedTag.required = ["locale"];
  spec.components.schemas.ApiSimpleLocalizedData.required = ["locale"];
  spec.components.schemas.ApiActivationCodeResponse.required = ["code", "expires"];
  spec.components.schemas.ApiSearchList.required = ["items", "pageNumber", "pageSize", "totalCount"];
  spec.components.schemas.ApiSearch.required = ["asset"];
  spec.components.schemas.ApiChannelAsset.required = ["startTime", "endTime", "asset"];
  spec.components.schemas.ApiTag.required = ["tagValues", "type"];
  spec.components.schemas.ApiTagValues.required = ["tagId"];
  spec.components.schemas.ApiSeason.required = ["season", "seasonId", "tvshowId", "localized", "episodes"];
  spec.components.schemas.EntitleResponse.required = ["streamInfo"];
  spec.components.schemas.ApiLoginResponse.required = ["sessionToken", "expirationDateTime"];
  spec.components.schemas.ApiAnonymousSessionResponse.required = ["sessionToken", "expirationDateTime"];
  spec.components.schemas.ApiStorePurchaseTransaction.required = [
    "from",
    "until",
    "status",
    "transactions",
    "productOfferingId"
  ];
  spec.components.schemas.ApiStoreTransaction.required = ["transactionId", "completedTime", "refunded", "status"];
  spec.components.schemas.ApiPaymentMethod.required = ["id", "preferred"];
  spec.components.schemas.ApiCardSummary.required = ["last4", "brand", "expiryMonth", "expiryYear"];
  spec.components.schemas.ApiStripePaymentMethodsAndPrice.required = ["methodTypes"];
  spec.components.schemas.ApiStripeWalletAndPrice.required = ["name", "price", "recurring"];
  spec.components.schemas.Sprites.required = ["width"];
  spec.components.schemas.ApiMarkerPoint.required = [
    "offset",
  ];
  spec.components.schemas.DrmUrls.required = [
    "certificateUrl", "licenseServerUrl"
  ];
  spec.components.schemas.MediaFormat.required = ["format"];
  // Add known enum types (instead of strings)
  spec.components.schemas.PaymentProvider = {
    type: "string",
    enum: ["stripe", "googleplay", "appstore", "external", "deny"]
  };
  spec.components.schemas.AdClipCategory = {enum: ["ad", "vod"], "type": "string" };
  spec.components.schemas.AdClips.properties.category = { "$ref": "#/components/schemas/AdClipCategory" };
  spec.components.schemas.AdStitcher = {enum: ["GENERIC", "INTERNAL", "NOWTILUS"], "type": "string" };
  spec.components.schemas.Ads.required = ["stitcher"];
  spec.components.schemas.Ads.properties.stitcher = { "$ref": "#/components/schemas/AdStitcher" }
  spec.components.schemas.MarkerType = {enum: ["INTRO", "CREDITS", "POINT", "CHAPTER"], "type": "string" };
  spec.components.schemas.ApiMarkerPoint.properties.type = { "$ref": "#/components/schemas/MarkerType" }
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/entitle"].get.parameters.find(
    (param: any) => param.name === "paymentProvider"
  ).schema = { $ref: "#/components/schemas/PaymentProvider" };
  // Restore props from the play response format.drm that was removed from the exposure spec,
  // but we depend on it in the player, and the back-end still sends it. 
  Object.assign(spec.components.schemas.DRMLicense.properties, {
    "com.microsoft.playready": { $ref: `${SCHEMA_PREFIX}DrmUrls` },
    "com.widevine.alpha": { $ref: `${SCHEMA_PREFIX}DrmUrls` },
    "com.apple.fps": { $ref: `${SCHEMA_PREFIX}DrmUrls` },
  });

  // Override inconsistent, vague or otherwise bad method names
  spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/location"].get.operationId = "getLocation"; // was "get" (vague)
  spec.paths["/v2/location"].get.operationId = "getLocationFromReferer"; // was "get_1" (vague)
  spec.paths["/v2/time"].get.operationId = "getTimeAnonymous"; // was "time" (vague)
  spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/time"].get.operationId = "getTime"; // was time_1 (vague)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/store/account/purchases"].get.operationId =
    "getPurchaseTransactions"; // was "getAccountPurchases" (vague)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/store/purchase"].get.operationId =
    "getOfferingPurchases"; // was "getAccountPurchases2" (vague)
  spec.paths[
    "/v2/customer/{customer}/businessunit/{businessUnit}/store/productoffering/country/{countryCode}"
  ].get.operationId = "getOfferingsByCountry"; // was "getOfferings" (vague)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/auth/anonymous"].post.operationId = "loginAnonymous"; // was "anonymousSessionV2" (inconsistent with the other login methods)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/details"].get.operationId = "getUserDetails"; // was "userDetailsGetV2" (Yoda)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/details"].put.operationId = "updateUserDetails"; // was "userDetailsUpdateV2" (Yoda)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/user/profile/{userId}"].put.operationId =
    "updateUserProfile"; // was "userProfileUpdate" (Yoda)
  spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/epg/asset/{assetId}/next"].get.operationId =
    "getNextProgramForAsset"; // was "getNextProgramForAsset2", but there is no "getNextProgramForAsset(1)", and also the numbers should be "v1", "v2", "v3" etc corresponding to the url, not just "2"
  spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag"].get.operationId =
    "getTagsFromPreferencesList"; // was "getList" (vague)
  spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}"].post.operationId =
    "addTagToPreferencesList"; // was "addToList" (vague)
  spec.paths[
    "/v1/customer/{customer}/businessunit/{businessUnit}/preferences/list/{list}/tag/{id}"
  ].delete.operationId = "deleteTagFromPreferencesList"; // was "deleteFromList" (vague)
  // fix misnamed params
  spec.paths[
    "/v3/customer/{customer}/businessunit/{businessUnit}/content/search/asset/query/{query}"
  ].get.parameters.find((q: any) => q.name === "locales").name = "locale";

  const playParams = spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/entitlement/{assetId}/play"].get.parameters
  playParams.forEach((param: any) => {
    if (["audioOnly", "autoplay", "ccpaConsent", "gdprOptin", "limitAdTracking", "live", "mute", "persistent", "timeShift"].includes(param.name)) {
      param.schema.type = "boolean";
    } else if (["end", "start", "width", "height", "latitude", "longitude", "maxFrameRate"].includes(param.name)) {
      param.schema.type = "integer";
    }
  });

  // Ignore problematic endpoints
  delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/config/{fileName}"].get; // name-clashes, duplicate,experimantal and unused
  delete spec.paths["/v3/customer/{customer}/businessunit/{businessUnit}/content/search/participant/query/{query}"].get; // does this even work? (always returns "Unknown error" 500 and is void return type)
  delete spec.paths["/v2/customer/{customer}/businessunit/{businessUnit}/epg/{channelId}/xmltv"].get; // returns xml, but declared as application/json, probably not meant to be part of this SDK

  // Delete problematic unused types (cashes with other types or fails to get detected as unused by the generator)
  delete spec.components.schemas.ApiPlayResponse; // old unused play response
  delete spec.components.schemas.Tv; // xmltv types
  delete spec.components.schemas.Audio;
  delete spec.components.schemas.Video;
  delete spec.components.schemas.Channel;
  delete spec.components.schemas.DisplayName;
  delete spec.components.schemas.Icon;

  // These used to be camel cased, but it was changed recently, which made the generated output service names inconsistent for us
  // Maybe it should be lowercased though, in which case we can just keep maintaining this patch
  const tagNameToCamelCase: Record<string, string> = {
    clientconfig: "clientConfig",
    customerconfig: "customerConfig",
    userplayhistory: "userPlayHistory"
  };

  for (let methods of Object.values(spec.paths)) {
    for (let methodSpec of Object.values(methods || {})) {
      const firstTag = methodSpec.tags?.[0];
      // fix camelCase the tag
      if (firstTag) {
        methodSpec.tags[0] = tagNameToCamelCase[firstTag] || firstTag;
      }
      // replace invalid type "ref" with string
      for (let { schema } of (methodSpec?.parameters || []) as any[]) {
        if (schema?.type === "ref") {
          schema.type = "string";
        }
      }
    }
  }

  // Copy enum types from props into schemas
  // The reason for this is that multiple props have the same enum types instead of referencing them.
  // Our script will de-duplicate these later on, but it needs a schema for this.
  spec.components.schemas.StoreTransactionStatus = makeSchemafromProp(
    spec.components.schemas.ApiAppStorePurchaseVerifyResponse.properties.transactionStatus
  );
  spec.components.schemas.AssetMaterialType = makeSchemafromProp(
    spec.components.schemas.ApiAsset.properties.materialType
  );
  spec.components.schemas.AssetType = makeSchemafromProp(spec.components.schemas.ApiAsset.properties.type);
  spec.components.schemas.DeviceType = makeSchemafromProp(spec.components.schemas.ApiDevice.properties.type);
  spec.components.schemas.ImageOrientation = makeSchemafromProp(
    spec.components.schemas.ApiImage.properties.orientation
  );
  spec.components.schemas.LicenseExpirationReason = makeSchemafromProp(
    spec.components.schemas.DRMLicense.properties.licenseExpirationReason
  );
  spec.components.schemas.ProductOfferingPurchaseStatus = makeSchemafromProp(
    spec.components.schemas.ApiProductOfferingPurchase.properties.status
  );
  spec.components.schemas.MediaFormatType = makeSchemafromProp(spec.components.schemas.MediaFormat.properties.format);

  return JSON.stringify(spec);
}

function makeSchemafromProp(prop: any & { enum: string; type: string }) {
  return { enum: prop.enum, type: prop.type };
}

function fixFalseListSchema(response: any) {
  const responseTypeSpec = Object.values(response.content)[0] as any;
  responseTypeSpec.schema = responseTypeSpec.schema.items;
}

function formatTypeName(name: string) {
  // Remove useless Api prefix
  if (name.startsWith("Api")) {
    name = `${name.charAt(3).toUpperCase()}${name.slice(4)}`;
  }
  // Replace spaces with uppercasing the next letter (like camelCaseor PascalCase, but doesn't touch the first letter)
  // We need this to avoid generating type names like "User_details" or "User20Details"
  return name
    .split(" ")
    .map((word, index) => (index ? word[0].toUpperCase() : word[0]) + word.slice(1))
    .join("");
}

const SCHEMA_PREFIX = "#/components/schemas/";
const INPUT_FILE = resolve(process.cwd(), "./exposure-spec.json");
const FORMATTED_SPEC = resolve(process.cwd(), "./exposure-spec-patched.json");
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

let data = readFileSync(INPUT_FILE, "utf-8");
data = patchSpec(data);
data = data.replaceAll(/\s*<p>\s*/g, ""); // strip <p> in comments
data = data.replaceAll(/\s*<br>\s*/g, "\\n"); // replace <br> with space
data = data.replaceAll(/\s*\\n\s*/g, "\\n"); // strip spaces around line breaks
data = data.replaceAll(/(?<="#\/components\/schemas\/)[^"]*/g, formatTypeName);
const spec = JSON.parse(data);

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

// Create reference map for deduplicating enums by value
const ENUM_SCHEMAS = new Map<string, string>();

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

/**
 * Delete some paths that should not be in the generated SDK
 */

// delete the api docs and export endpoints
delete spec.paths["/docs/api-docs/{api}"];
delete spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/export/asset"];
// delete 307 redirect endpoint (cannot be used in an SDK)
delete spec.paths["/v1/customer/{customer}/businessunit/{businessUnit}/content/asset/{assetId}/thumbnail"];

const unhandledPathEnums = new Set<string>();
for (let [path, methods] of Object.entries(spec.paths) as [string, any][]) {
  for (let [methodType, methodSpec] of Object.entries(methods || {}) as any[]) {
    const firstTag = methodSpec.tags?.[0];
    if (!firstTag) {
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
    if ((refSpec = getRefSpec(schemaContext?.$ref))) {
      delete schemaContext.$ref;
      Object.assign(schemaContext, refSpec);
    }
    for (let { name, schema } of (methodSpec?.parameters || []) as any[]) {
      // Deduplicate enums in path spec
      if (schema?.enum && schema.type === "string") {
        const dataStr = JSON.stringify(schema.enum.sort());
        const refName = ENUM_SCHEMAS.get(dataStr);
        if (refName) {
          console.log(`Deduplicating path enum: "${name}.${name}" => ${refName}`);
          schema.$ref = `${SCHEMA_PREFIX}${refName}`;
          delete schema.enum;
          delete schema.type;
        } else if (!["fieldSet"].includes(name)) {
          // Ignore fieldset
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
  const currentUnusedComponents = Object.keys(spec.components.schemas).filter(
    name => !data.includes(`${SCHEMA_PREFIX}${name}`)
  );
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
  console.log(
    Object.entries(unhandledComponentEnums)
      .map(([name, dataStr]) => `  - ${name}: ${dataStr}`)
      .join("\n")
  );
}

if (unhandledPathEnums.size) {
  console.log(
    `\n⚠️   ROUTE enums which will be left declared inline and will not be deduplicated:\n - ${Array.from(
      unhandledPathEnums
    ).join("\n - ")}`
  );
}

if (untypedRoutes.length) {
  const formattedRoutes = ["", ...untypedRoutes.sort()].join("\n -  ");
  console.warn(
    `\n⚠️   Endpoints which do not specify a return type specification. They will return a HTTP fetch response interface rather than the typed data from the response:${formattedRoutes}`
  );
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
  templates: resolve(process.cwd(), "./templates"),
  defaultResponseAsSuccess: true, // We need this because we sometimes use "default" as a server status code for 2xx
  generateClient: true, // Otherwise we just generate the data-contract file
  generateResponses: true, // This puts the server error code in the method docblock
  extractEnums: false, // We already do this by moving enums to the spec. Don't want to do it for all values that are enums.
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
    onFormatRouteName(routeInfo) {
      // allow duplicates for search (because we did before)
      if (["searchV2", "searchV3", "getSystemConfigV2"].includes(routeInfo.operationId)) {
        return routeInfo.operationId;
      }

      // strip remaining "v1", "v2", "v3" and (mostly suffixes, but a couple of times in the middle of the names)
      return routeInfo.operationId.replace(/v?\d/i, "");
    },
    onPrepareConfig(apiConfig) {
      const dupes = [...apiConfig.config.routeNameDuplicatesMap].filter(([, val]) => Number(val) > 1);
      if (dupes.length) {
        // If you get this error either delete unwanted duplicate routes in the pre-processing step:
        // (`delete spec.paths[...].get`), or add it to the exceptions (`onFormatRouteName` hook)
        throw new Error(`Duplicate routes found after renaming: ${dupes}`);
      }
    }
  }
})
  .then(({ configuration, files }) => {
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
    const exports = Object.values(moduleNames)
      .map(fileName => `export * from "./${fileName}.js"`)
      .join(";\n");
    const importStatements = ["http-client", ...Object.values(moduleNames)]
      .sort(Intl.Collator().compare)
      .map(name => [name, name === "http-client" ? "request, ServiceContext, ResponseError" : name]);
    const imports = importStatements
      .map(([fileName, module]) => `import { ${module} } from "./${fileName}.js"`)
      .join(";\n");
    const fileContent = `${imports};\n\nclass RBMOTTSDK {\n  ${typeDeclarations.join(
      ";\n  "
    )};\n  constructor(public context: ServiceContext) {\n    ${props.join(
      ";\n    "
    )};\n  }\n}\n\nexport default RBMOTTSDK;\nexport type { ServiceContext };\nexport { request, ResponseError };\nexport * from \"./data-contracts.js\";\n${exports};\n`;

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
  .catch((err: any) => console.error(err));
