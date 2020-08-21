import { DeviceGroup } from "./device-group";

export interface IExternalResponseOptions {
  locale: string;
  deviceGroup: DeviceGroup;
  customer: string;
  businessUnit: string;
}

export interface IExternalResponse<T> {
  externalResponse: (options: any) => T;
}
