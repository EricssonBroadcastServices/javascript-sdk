import { IOfferingPrice, IPrice, IProductOffering } from "@ericssonbroadcastservices/exposure-sdk";
import { mockPurchase } from "./mock-purchase-response";
import { mockProduct } from "./mock-product";
import { ProductOfferingType } from "@ericssonbroadcastservices/exposure-sdk/dist/interfaces/product-offering";

export const mockPrice: IPrice = {
  amount: 100,
  currency: "SEK",
  fractionDigits: 2
}

export const mockPrice2: IPrice = {
  amount: 1000,
  currency: "SEK",
  fractionDigits: 3
}

export const mockOfferingPrice: IOfferingPrice = {
  price: mockPrice,
  countryCode: "SE",
  vat: {
    included: true,
    percentage: 0
  }
}

const mockOfferingPriceWithVAT: IOfferingPrice = {
  price: mockPrice2,
  countryCode: "SE",
  vat: {
    included: true,
    percentage: 25
  }
};

// @ts-ignore
export const mockProductOffering: IProductOffering = {
  id: "123",
  offeringPrice: mockOfferingPrice,
  rentalLength: "PT1M",
  activePurchase: mockPurchase,
  localizedMetadata: [
    {
      locale: "en",
      name: "test",
      description: "123"
    }
  ],
  productIds: [mockProduct.id]
}

// @ts-ignore
export const mockProductOfferingWithoutPurchase: IProductOffering = {
  id: "456",
  offeringPrice: mockOfferingPriceWithVAT,
  localizedMetadata: [
    {
      locale: "en",
      name: "test",
      description: "123"
    }
  ]
}

export const mockEventTicket: IProductOffering = {
  rentalLength: "PT48H",
  productOfferingType: ProductOfferingType.EVENT,
  localizedMetadata: [
    {
      locale: "en",
      name: "1 min pass",
      description: "This product gives you access for 1 min. Used for testing."
    }
  ],
  productIds: ["1min1_82162E"],
  offeringPrice: {
    price: {
      amount: 100,
      fractionDigits: 2,
      currency: "USD"
    },
    countryCode: "SE",
    vat: {
      percentage: 25,
      included: true
    }
  },
  id: "40e1ca16-e8cf-424e-b4d3-5ebefdf63c2b",
  productOfferingId: "40e1ca16-e8cf-424e-b4d3-5ebefdf63c2b",
  entitlementStart: "2019-04-08T11:21:52.182Z",
  salesStart: "2019-04-08T11:21:47.182Z",
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
}

export const mockRental: IProductOffering = {
  productOfferingType: ProductOfferingType.RENTAL,
  rentalLength: "PT1M",
  localizedMetadata: [
    {
      locale: "en",
      name: "1 min pass 2.1",
      description: ""
    }
  ],
  productIds: ["a44acabb-768f-46b4-b74f-cd89a1509335_82162E"],
  offeringPrice: {
    price: {
      amount: 1000,
      fractionDigits: 2,
      currency: "SEK"
    },
    countryCode: "SE",
    vat: {
      percentage: 25,
      included: false
    }
  },
  id: "3a2f0ec0-852f-4c2a-bdca-b613fec088db_82162E",
  productOfferingId: "3a2f0ec0-852f-4c2a-bdca-b613fec088db_82162E",
  salesStart: "2019-10-28T13:49:25.555Z",
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
}

export const mockRentalWithRentalExpiryWindow: IProductOffering = {
  productOfferingType: ProductOfferingType.RENTAL,
  "rentalLength": "PT1M",
  "rentalExpiryWindow": "PT240H",
  "localizedMetadata": [{
    "locale": "en",
    "name": "1 min pass 3",
    "description": ""
  }],
  "productIds": ["0c404a06-2912-4c20-ab12-25c5283995ff_82162E"],
  "offeringPrice": {
    "price": {
      "amount": 10000,
      "fractionDigits": 2,
      "currency": "SEK"
    },
    "countryCode": "SE",
    "vat": {
      "percentage": 25.0,
      "included": true
    }
  },
  "id": "e679d4af-56e2-4e8c-a5ad-c55683ccc0c9_82162E",
  "productOfferingId": "e679d4af-56e2-4e8c-a5ad-c55683ccc0c9_82162E",
  "salesStart": "2019-10-28T14:01:19.649Z",
  "productRequiresSelectAsset": false,
  "paymentMethodTypes": ["card"]
}

export const mockRecurrence: IProductOffering = {
  productOfferingType: ProductOfferingType.SUBSCRIPTION,
  "recurrence": "P1M",
  "localizedMetadata": [{
    "locale": "sv",
    "name": "svod free first month"
  }],
  "productIds": ["e7b7f304-7592-4954-b170-263af49b49e4_82162E"],
  "offeringPrice": {
    "price": {
      "amount": 100,
      "fractionDigits": 2,
      "currency": "SEK"
    },
    "countryCode": "SE",
    "vat": {
      "percentage": 25.0,
      "included": true
    }
  },
  "id": "51a6f01b-1ee2-4a7c-aade-9b33d97199ec_82162E",
  "productOfferingId": "51a6f01b-1ee2-4a7c-aade-9b33d97199ec_82162E",
  "salesStart": "2021-07-20T13:03:19Z",
  "discount": {
    "numberOfRecurringPayments": 0,
    "freePeriod": "P1M"
  },
  "productRequiresSelectAsset": false,
  "paymentMethodTypes": ["card"]
}
export const mockProductOfferingGenerator = (id: string): IProductOffering => {
  return {
    ...mockProductOffering,
    id: id,
    productIds: [id]
  }
}
