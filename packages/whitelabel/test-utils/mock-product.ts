import { Product, ProductResponse } from "@EricssonBroadcastServices/exposure-sdk";

export const mockProduct = new Product();
mockProduct.blocked = false;
mockProduct.entitlementRequired = true;
mockProduct.id = "mockProductId";
mockProduct.name = "MockProduct";

export const mockProductResponse = new ProductResponse();
mockProductResponse.entitled = [mockProduct];

export const mockProductBlocked = new Product();
mockProductBlocked.blocked = true;
mockProductBlocked.entitlementRequired = true;
mockProductBlocked.id = "blockedProduct";

export const mockProductAnonymous = new Product();
mockProductAnonymous.blocked = false;
mockProductAnonymous.entitlementRequired = false;
mockProductAnonymous.id = "mockProductAnonymous";
mockProductAnonymous.anonymousAllowed = true;

