import { BaseService, CustomerAndBusinessUnitOptions } from "./base-service";
import { deserialize } from "../decorators/property-mapper";
import { CustomerConfigFile } from "../models/customer-config-file-model";

interface GetConfigFileByOriginOptions {
  origin: string;
  queryParams?: { name: string; value: string };
}

interface GetConfigFileOptions extends CustomerAndBusinessUnitOptions {
  queryParams?: { name: string; value: string };
  fileId: string;
}

export class CustomerConfigService extends BaseService {
  public getConfigFileByOrigin({ origin, queryParams }: GetConfigFileByOriginOptions) {
    let queryString = "";
    if (queryParams) {
      queryString = `${queryParams.name}=${queryParams.value}`;
    }
    return this.get(`/v1/config/appConfig.json/origin/${origin}?${queryString}`).then((data) =>
      deserialize(CustomerConfigFile, data)
    );
  }

  public getConfigFile({ customer, businessUnit, queryParams, fileId }: GetConfigFileOptions) {
    let queryString = "";
    if (queryParams) {
      queryString = `${queryParams.name}=${queryParams.value}`;
    }
    return this.get(
      `${this.cuBuUrl({
        apiVersion: "v1",
        customer,
        businessUnit,
      })}/config/${fileId}?${queryString}`
    ).then((data) => deserialize(CustomerConfigFile, data));
  }
}
