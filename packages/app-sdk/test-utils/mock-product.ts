import { Product } from "@ericssonbroadcastservices/rbm-ott-sdk";

export const mockProduct: Product = {
  blocked: false,
  entitlementRequired: true,
  id: "mockProductId",
  name: "MockProduct",
  anonymousAllowed: false
};

export const mockProductResponse = {
  entitled: [mockProduct],
  notEntitled: []
};

export const mockProductBlocked: Product = {
  blocked: true,
  entitlementRequired: true,
  id: "blockedProduct",
  name: "blocked",
  anonymousAllowed: false
};

export const mockProductAnonymous: Product = {
  blocked: false,
  entitlementRequired: false,
  id: "mockProductAnonymous",
  name: "mockProductAnonymous",
  anonymousAllowed: true
};
