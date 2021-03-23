import { deserialize } from "../src/decorators/property-mapper";
import { Publication } from "../src/models/asset-model";

export const product1 = "03278a7e-b029-4be9-bbec-32cd1b0ea708_629E11";
export const product2 = "22e5cdc1-787e-4382-b268-f923098de70a_629E11";
export const freeProduct = "free_product_629E11";

const publicationJson = [
  {
    // active publication
    countries: [],
    customData: null,
    devices: [],
    fromDate: new Date(Date.now() - 60 * 60000),
    products: [product1, product2],
    availabilityKeys: [product1, product2],
    publicationDate: "2020-08-20T18:00:00Z",
    publicationId: "dc3c8e9f-6f52-4639-a2c1-746c79dd2737_629E11",
    services: [],
    toDate: new Date(Date.now() + 60 * 60000)
  },
  {
    // future publication
    countries: [],
    customData: null,
    devices: [],
    fromDate: new Date(Date.now() + 60 * 60000 * 24 * 7),
    products: [freeProduct],
    availabilityKeys: [freeProduct],
    publicationDate: "2021-03-27T23:02:00Z",
    publicationId: "6a11cc4b-d169-4501-a0e0-af2398a5cc53_629E11",
    services: [],
    toDate: new Date(Date.now() + 60 * 60000 * 24 * 8)
  },
  {
    // old invalid publication
    countries: [],
    customData: null,
    devices: [],
    fromDate: new Date(Date.now() - 60 * 60000 * 24 * 7),
    products: [freeProduct],
    availabilityKeys: [freeProduct],
    publicationDate: "2021-03-22T14:36:00Z",
    publicationId: "dfd4c4d4-3d2a-470c-ae23-bf52068487f4_629E11",
    services: [],
    toDate: new Date(Date.now() - 60 * 60000 * 24 * 6)
  }
];

export const mockPublications = publicationJson.map(p => deserialize(Publication, p));
