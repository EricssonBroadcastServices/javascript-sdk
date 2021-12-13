import { CustomerConfigService } from "./customer-config-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";
import { mocks } from "../../test-utils/mocks";
import { CustomerConfigFile } from "../models/customer-config-file-model";

describe("Auth service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "sessionToken" }),
    httpClient: axios
  };
  const customerConfigService = new CustomerConfigService(serviceOptions);
  beforeEach(() => {
    const mockReturnValue = {
      data: {}
    };
    spyOn(axios, "post").and.returnValue(Promise.resolve(mockReturnValue));
    spyOn(axios, "get").and.returnValue(Promise.resolve(mockReturnValue));
  });
  it("should get file", async () => {
    let response = await customerConfigService.getConfigFile({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      fileId: "test.json"
    });
    expect(response).toBeInstanceOf(CustomerConfigFile);
    expect(
      axios.get
    ).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/config/test.json?`,
      { headers: undefined }
    );

    response = await customerConfigService.getConfigFile({
      customer: mocks.customer,
      businessUnit: mocks.businessUnit,
      fileId: "test.json",
      queryParams: {
        name: "test",
        value: "test"
      }
    });
    expect(response).toBeInstanceOf(CustomerConfigFile);
    expect(
      axios.get
    ).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v1/customer/${mocks.customer}/businessunit/${mocks.businessUnit}/config/test.json?test=test`,
      { headers: undefined }
    );
  });
  it("should get file by origin", async () => {
    let response = await customerConfigService.getConfigFileByOrigin({
      origin: "test"
    });
    expect(response).toBeInstanceOf(CustomerConfigFile);
    expect(axios.get).toHaveBeenCalledWith("https://testbaseurl.com/v1/config/appConfig.json/origin/test?", {
      headers: undefined
    });

    response = await customerConfigService.getConfigFileByOrigin({
      origin: "test",
      queryParams: {
        name: "name",
        value: "value"
      }
    });
    expect(response).toBeInstanceOf(CustomerConfigFile);
    expect(axios.get).toHaveBeenCalledWith("https://testbaseurl.com/v1/config/appConfig.json/origin/test?name=value", {
      headers: undefined
    });
  });
});
