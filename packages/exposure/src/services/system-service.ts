import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { SystemConfig } from "../models/system-config-model";

export class SystemService extends BaseService {
  public getSystemConfig({ customer, businessUnit }: CustomerAndBusinessUnitOptions) {
    return this.get(`/v1/customer/${customer}/businessunit/${businessUnit}/systemConfig`).then((data) =>
      deserialize(SystemConfig, data)
    );
  }
}
