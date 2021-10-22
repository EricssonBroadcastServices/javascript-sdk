import { IProductOffering } from "@ericssonbroadcastservices/exposure-sdk";

export interface IListOffering {
  productOffering: IProductOffering;
  // include available at Date if available for offerings that is only applicable in the future.
  availableAtDate?: Date;
}
