# RBM-OTT-SDK

Red Bee Media OTT SDK is generated from the Red Bee Media OTT [Exposure API OpenAPI (Swagger) specification](https://exposure.api.redbee.live/docs/).

You can import and use the whole API or just the parts you need:

## Status

RBM-OTT-SDK is not yet stable and is subject to change. Alot of the methods that are declared as optional are not really optional.

## Initializing and using the SDK

```ts
import { AssetService } from "@ericssonbroadcastservices/rbm-ott-sdk";

const context = { customer, businessUnit, baseUrl };

// Create an Asset API service with all enpoints for assets collected
const assetService = new AssetService(context);

assetService.getAssets({ assetIds: [...] })
  .then(({ items }) => {
    console.log("Fetched assets", items);
  });
```

Alternatively, you can create a service instance with namespaces for the whole SDK:

```ts
import RBMSDK from "@ericssonbroadcastservices/rbm-ott-sdk";

const api = new RBMSDK(context);

api.asset.getAssets({ assetIds: [...] }).then(...);
```

If you need the most lightweight alternative, you can import only the methods you will using. These are unbound class methods that are designed to be bound to a class before you run them.

```ts
import { getAsset, getAssets, ServiceContext } from "@ericssonbroadcastservices/rbm-ott-sdk";

export class MyCustomService {
  constructor(private context: ServiceContext) {}
  getAsset = getAsset;
  getAssets = getAssets;
}

const myService = new MyCustomService(context);

myService.getAssets({ assetIds: [...] }).then(...);
```

[Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) also allows to use these unbound class methods in other ways.

```ts
// For the "this" argument you can either specify the context directly or an object/instance with a property `context`.
getAssets.call(context, { assetIds: [...] }).then(...);
```

## Authentication

Some routes require authentication via session tokens. If you don't have a session token, then you need to use an authentication method to get it:

```ts
import { AuthenticationService } from "@ericssonbroadcastservices/rbm-ott-sdk";

const context = { customer, businessUnit, baseUrl };

const authService = new AuthenticationService(context);

const { sessionToken } = await authService.login({ username, password, device });
```

After that for any request you want to make authenticated with this session token, include an `Authorization` header with the value `Bearer ${sessionToken}`

## Error handling

The SDK will throw an error when the server response code is not in the range 200-299.

You can also add your own error factory method that takes a [Reponse](https://developer.mozilla.org/en-US/docs/Web/API/Response) and creates an `Error`.

```ts
const context = {
  customer,
  businessUnit,
  baseUrl,
  errorFactory(response: Response) {
    const err = new Error(response.statusText);
    err.type = response.url.includes("/login/") ? "LOGIN_ERROR" : "API_ERROR";
    err.statusCode = response.status;
  },
};
```

## Fetching partial data

Some of our endpoint have the query parameters `fieldSet`, `excludeFields` and `includeFields` for requesting partial data (smaller responses).

Because these parameters make it impossible for us to know the return type, we have moved them to separate methods with the `Partial` suffix.

The way this works is `fieldSet` specifies if you want to fetch either `ALL`, `NONE` or `PARTIAL` fields by default, and then you can add or remove to this data set with `includeFields` or `excludeFields`. The fields that are included in the `PARTIAL` set differs per endpoint.

These methods will return `Promise<any>` unless you pass in a generic type.

Example use:

```ts
import { AssetService, Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

const context = { customer, businessUnit, baseUrl };

const assetService = new AssetService(context);

type PartalAsset = Pick<Asset, "type" | "slugs" | "created" | "changed">;

interface PartialAssetList extends Omit<AssetList, "items"> {
  items: PartalAsset[];
}

assetService.getAssetPartial<PartialAsset>({ assetId: "asdf1234", fieldSet: "NONE", includeFields: "type,slugs,created,changed" })
  .then((partialAsset) => {
    console.log("Fetched partial asset", partialAsset);
  });

assetService.getAssetsPartial<PartialAssetList>({ fieldSet: "NONE", includeFields: "type,slugs,created,changed" })
  .then((partialAssetList) => {
    console.log("Fetched partial asset list", partialAssetList);
  });
```
