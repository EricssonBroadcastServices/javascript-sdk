import { IPurchase, IPurchaseResponse } from "@ericssonbroadcastservices/exposure-sdk";

export const mockPurchase: IPurchase = {
  from: new Date(Date.now() - 100000).toISOString(),
  until: new Date(Date.now() + 100000).toISOString(),
  renewal: false,
  status: "FULFILLED",
  transactionId: "123",
  id: "mockPurchase",
  productOfferingId: "456"
};

export const mockPurchaseResponse: IPurchaseResponse = {
  purchases: [mockPurchase],
  consumedProductOfferingDiscounts: []
};
