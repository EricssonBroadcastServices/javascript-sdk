import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { ISystemConfigV2 } from "../interfaces/config/system-config-v2";
import { ISystemConfig } from "../interfaces/config/system-config";

export class SystemService extends BaseService {
  public getSystemConfig({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<ISystemConfig> {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/systemConfig`);
  }

  public getSystemConfigV2({
    customer,
    businessUnit,
    countryCode
  }: CustomerAndBusinessUnitOptions & { countryCode: string }): Promise<ISystemConfigV2> {
    return this.get(`/v2/customer/${customer}/businessunit/${businessUnit}/system/config?countryCode=${countryCode}`);
  }
}
