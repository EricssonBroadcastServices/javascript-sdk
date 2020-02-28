import { jsonProperty } from "../decorators/json-property";
import { SystemConfig } from "./system-config-model";

export class CustomerConfigFile {
  @jsonProperty()
  public businessUnit: string;
  @jsonProperty()
  public customer: string;
  @jsonProperty()
  public version: string;
  @jsonProperty()
  public config: any;
  @jsonProperty()
  public systemConfig: SystemConfig;
}
