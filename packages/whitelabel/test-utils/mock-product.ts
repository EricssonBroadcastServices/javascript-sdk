import { IProduct, IProductResponse } from "@ericssonbroadcastservices/exposure-sdk";

export const mockProduct: IProduct = {
  blocked: false,
  entitlementRequired: true,
  id: "mockProductId",
  name: "MockProduct",
  anonymousAllowed: false
}

export const mockProductResponse: IProductResponse = {
  entitled: [mockProduct],
  notEntitled: []
}

export const mockProductBlocked: IProduct = {
  blocked: true,
  entitlementRequired: true,
  id: "blockedProduct",
  name: "blocked",
  anonymousAllowed: false
}

export const mockProductAnonymous: IProduct = {
  blocked: false,
  entitlementRequired: false,
  id: "mockProductAnonymous",
  name: "mockProductAnonymous",
  anonymousAllowed: true
}

