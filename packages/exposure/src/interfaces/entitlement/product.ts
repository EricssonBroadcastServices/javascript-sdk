export interface IProduct {
  id: string;
  name: string;
  entitlementRequired: boolean;
  blocked: boolean;
  anonymousAllowed: boolean;
}

export interface IProductResponse {
  entitled: IProduct[];
  notEntitled: IProduct[];
}

export interface IAvailabilityKeysResponse {
  expiryDate: string;
  availabilityKeys: string[];
  futureAvailabilityKeys: string[];
}
