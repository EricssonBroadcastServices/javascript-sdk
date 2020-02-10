import { Product } from "./Product";
import { ProductOffering } from "./ProductOfferingsResponse";

export class EntitlementsUtils {
  public publications;
  public requiredProducts = (): string[] => {
    /* eslint-disable prefer-spread */
    return [].concat.apply(
      [],
      this.publications.map(pub => pub.products)
    );
  };
  public getHasProperProduct = (userEntitlements: Product[]) => {
    const isEntitled = userEntitlements.filter(ut =>
      this.requiredProducts().includes(ut.id)
    );
    return isEntitled.length > 0;
  };
  public getBuyableProductOfferings = (
    availableProductOfferings: ProductOffering[]
  ) => {
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // TODO: solve this with proper typings, cannot find a solution now, hence eslint disable
    const buyable = [].concat
      .apply(
        [],
        // @ts-ignore
        availableProductOfferings.map(po => po.productIds)
      )
      .filter(p => this.requiredProducts().includes(p));
    return availableProductOfferings.filter(
      po => po.productIds.filter(pId => buyable.includes(pId)).length > 0
    );
  };
  public getIsBlackedOut = (userEntitlements: Product[]) => {
    const blockedProducts = userEntitlements.filter(ut => ut.blocked);
    return (
      this.requiredProducts().filter(p =>
        blockedProducts.map(bp => bp.id).includes(p)
      ).length > 0
    );
  };

  public getAnonymousProducts = (userEntitlements: Product[]) => {
    return userEntitlements.filter(ut => ut.anonymousAllowed).map(ut => ut.id);
  };

  public anonymousIsAllowed = (userEntitlements: Product[]) => {
    return (
      this.getAnonymousProducts(userEntitlements).filter(p =>
        this.requiredProducts().includes(p)
      ).length > 0
    );
  };
}
