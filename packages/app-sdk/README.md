# RedBee APP SDK
The app-sdk handles data fetching and data transformation for the apps in a single package. It includes an integration with the whitelabel cms. While most data fetching can, and should, be done with the `rbm-ott-sdk`, `app-sdk` simplifies the parts related to the whitelabel cms by implementing uniform interfaces for both user defined components and components generated by the sdk.

### WhiteLabelService
The app sdk exports a `WhiteLabelService` which should be used to fetch configuration and content for the white label apps.
It can be used like this:

```typescript
import { ServiceContext, login } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelService } from "./src";

const serviceContext: ServiceContext = {
  customer: "CU",
  businessUnit: "BU",
  baseUrl: "https://exposure.api.redbee.dev"
};

const { sessionToken } = await login.call(serviceContext, {
  username: "username",
  password: "password",
  device: {
    deviceId: "deviceId",
    name: "deviceName"
  }
});

const service = new WhiteLabelService({
  ...serviceContext,
  deviceGroup: "WEB",
  getAuthToken: () => Promise.resolve(sessionToken)
});

const config = await service.getConfigByCustomerAndBusinessUnit({ countryCode: "SE" });

console.log(config);

```

See `src/services/white-label-service.ts` for available methods.

### Utilities
This package also includes a bunch of utilities for transforming data. The idea is to handle stuff like resolving metadata, with fallbacks etc, uniformely in all apps, and to avoid recreating stuff separatly in different apps.

Example:

```typescript
import { ServiceContext, getAsset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { AssetHelpers } from "./src";

const serviceContext: ServiceContext = {
  customer: "CU",
  businessUnit: "BU",
  baseUrl: "https://exposure.api.redbee.dev"
};

const asset = await getAsset.call(serviceContext, {
  assetId: "anAssetId"
});

const title = AssetHelpers.getTitle(asset, { language: "se", defaultLanguage: "en" });

console.log(title);

```

See `src/utils` for available utility modules