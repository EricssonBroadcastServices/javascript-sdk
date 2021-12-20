import { IPurchase } from "../interfaces/payment/purchase";

function getTvods(purchases: IPurchase[]) {
  return purchases.filter((p) => p.assetId);
}

export const purchaseUtils = {
  getTvods,
};
