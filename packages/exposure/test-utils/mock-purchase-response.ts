import { Purchase, PurchaseResponse } from "../src";

const mockPurchase = new Purchase();
mockPurchase.from = new Date(Date.now() - 100000);
mockPurchase.until = new Date(Date.now() + 100000);
mockPurchase.renewal = false;
mockPurchase.status = "FULFILLED";
mockPurchase.transactionId = "123";
mockPurchase.id = "mockPurchase";

export const mockPurchaseResponse = new PurchaseResponse();
mockPurchaseResponse.purchases = [mockPurchase];
