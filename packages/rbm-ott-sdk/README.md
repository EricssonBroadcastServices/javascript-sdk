# RBM-OTT-SDK

Red Bee Media OTT SDK is generated from the Red Bee Media OTT [Exposure API OpenAPI (Swagger) specification](https://exposure.api.redbee.live/docs/).

You can import and use thw whole API or just the parts you need:

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

Some routes require authentication via session tokens. You can add this to the context object as a string named `sessionToken`.

```ts
import RBMSDK from "@ericssonbroadcastservices/rbm-ott-sdk";

const api = new RBMSDK({ customer, businessUnit, baseUrl, sessionToken });

// This call will be made authenticated with your session token.
api.asset.getAsset(assetId)
```

If you don't have a session token, then you need to use an authentication method

```ts
import { AuthenticationService } from "@ericssonbroadcastservices/rbm-ott-sdk";

const context = { customer, businessUnit, baseUrl };

const authService = new AuthenticationService(context);

authService.login({ username, password, device })
  .then(() => {
    // You are now logged in, and further requests will be authenticated with your session token.
  });
```

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

The query parameters `fieldSet`, `excludeFields` and `includeFields` have been removed from all methods because make the return type inconsistent. Instead we added dedicated methods for when you need to use these arguments. These have the same name but the suffix `Partial`.

If you for example want to use `getAsset(...)` with these partial arguments, you instead need to use `getAssetPartial<ExpectedType>(...)`.

```ts
import { AssetService, Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";

const context = { customer, businessUnit, baseUrl };

const assetService = new AssetService(context);

type PartialAsset = Partial<Asset>;

assetService.getAssetPartial<PartialAsset>("asdf1234", { fieldSet: "PARTIAL", excludeFields: "..." })
  .then((partialAsset) => {
    console.log("Fetched partial asset", partialAsset);
  });
```

Note that if you don't pass the type in to the generic, it will still work, but will return `Promise<any>`.
