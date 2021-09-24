import { IPurchase } from "../interfaces/purchase";

function getTvods(purchases: IPurchase[]) {
  return purchases.filter(p => p.assetId);
}

export const purchaseUtils = {
  getTvods
};
