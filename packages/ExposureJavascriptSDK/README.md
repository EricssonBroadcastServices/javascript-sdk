## Red bee exposure api javascript sdk
This sdk provides methods for interacting with Red Bee Medias exposure api.
### Usage
```js
import { ExposureApi } from "placeholder-package-name";

const api = new ExposureApi({
  baseUrl: "https://exposureapi.emp.ebsd.ericsson.net"
});

// get assets 
async function getAssets() {
    const assets = await api.content.getAssetsV1({
        customer,
        businessUnit
        /*
            optional parameters:
                query: string; // e.g type:MOVIE
                sort: string; // a parameter to sort by
                pageSize: number
                pageNumber: number
                allowedCountry: string // a country code. only return assets available in a specific country
        */
    });
}

```