import { mockProduct } from "./mock-product";
import { StorePriceTag, StoreProductOffering, StoreProductOfferingPrice } from "@ericssonbroadcastservices/rbm-ott-sdk";

export const mockPrice: StorePriceTag = {
  amount: 100,
  currency: "SEK",
  fractionDigits: 2
};

export const mockPrice2: StorePriceTag = {
  amount: 1000,
  currency: "SEK",
  fractionDigits: 3
};

export const mockOfferingPrice: StoreProductOfferingPrice = {
  price: mockPrice,
  countryCode: "SE",
  vat: {
    included: true,
    percentage: 0
  }
};

const mockOfferingPriceWithVAT: StoreProductOfferingPrice = {
  price: mockPrice2,
  countryCode: "SE",
  vat: {
    included: true,
    percentage: 25
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mockProductOffering: StoreProductOffering = {
  id: "123",
  offeringPrice: mockOfferingPrice,
  rentalLength: "PT1M",
  localizedMetadata: [
    {
      locale: "en",
      name: "test",
      description: "123"
    }
  ],
  productIds: [mockProduct.id]
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mockProductOfferingWithoutPurchase: StoreProductOffering = {
  id: "456",
  offeringPrice: mockOfferingPriceWithVAT,
  localizedMetadata: [
    {
      locale: "en",
      name: "test",
      description: "123"
    }
  ]
};

export const mockEventTicket: StoreProductOffering = {
  rentalLength: "PT48H",
  productOfferingType: "event",
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
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
};

export const mockRental: StoreProductOffering = {
  productOfferingType: "rental",
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
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
};

export const mockRentalForMockAsset: StoreProductOffering = {
  ...mockRental,
  productIds: ["1min1_82162E"]
};

export const mockRentalWithRentalExpiryWindow: StoreProductOffering = {
  productOfferingType: "rental",
  rentalLength: "PT1M",
  rentalExpiryWindow: "PT240H",
  localizedMetadata: [
    {
      locale: "en",
      name: "1 min pass 3",
      description: ""
    }
  ],
  productIds: ["0c404a06-2912-4c20-ab12-25c5283995ff_82162E"],
  offeringPrice: {
    price: {
      amount: 10000,
      fractionDigits: 2,
      currency: "SEK"
    },
    countryCode: "SE",
    vat: {
      percentage: 25.0,
      included: true
    }
  },
  id: "e679d4af-56e2-4e8c-a5ad-c55683ccc0c9_82162E",
  productOfferingId: "e679d4af-56e2-4e8c-a5ad-c55683ccc0c9_82162E",
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
};

export const mockRecurrence: StoreProductOffering = {
  productOfferingType: "subscription",
  recurrence: "P1M",
  localizedMetadata: [
    {
      locale: "sv",
      name: "svod free first month",
      description: ""
    }
  ],
  productIds: ["e7b7f304-7592-4954-b170-263af49b49e4_82162E"],
  offeringPrice: {
    price: {
      amount: 100,
      fractionDigits: 2,
      currency: "SEK"
    },
    countryCode: "SE",
    vat: {
      percentage: 25.0,
      included: true
    }
  },
  id: "51a6f01b-1ee2-4a7c-aade-9b33d97199ec_82162E",
  productOfferingId: "51a6f01b-1ee2-4a7c-aade-9b33d97199ec_82162E",
  salesStart: "2021-07-20T13:03:19Z",
  discount: {
    numberOfRecurringPayments: 0,
    // free period is wrongly typed.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    freePeriod: "P1M"
  },
  productRequiresSelectAsset: false,
  paymentMethodTypes: ["card"]
};
export const mockProductOfferingGenerator = (id: string): StoreProductOffering => {
  return {
    ...mockProductOffering,
    id: id,
    productIds: [id]
  };
};
