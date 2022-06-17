import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { SystemConfig } from "../models/system-config-model";
import { ISystemConfigV2 } from "../interfaces/config/system-config-v2";

export class SystemService extends BaseService {
  public getSystemConfig({ customer, businessUnit }: CustomerAndBusinessUnitOptions): Promise<SystemConfig> {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/systemConfig`).then(data =>
      deserialize(SystemConfig, data)
    );
  }

  public getSystemConfigV2({
    customer,
    businessUnit,
    countryCode
  }: CustomerAndBusinessUnitOptions & { countryCode: string }): Promise<ISystemConfigV2> {
    return this.get(`/v2/customer/${customer}/businessunit/${businessUnit}/system/config?countryCode=${countryCode}`);
  }
}
