import { PaymentService } from "./payment-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";

describe("Payment service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "" }),
    httpClient: axios
  };
  const paymentService = new PaymentService(serviceOptions);
  it("should fetch product offerings with voucher code", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({}));
    await paymentService.getProductOfferingsByVoucherCode({
      customer: "CU",
      businessUnit: "BU",
      code: "123"
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/CU/businessunit/BU/store/productofferings/voucher/123`,
      {
        headers: {
          Authorization: ""
        }
      }
    );
  });
  it("should fetch product offerings with voucher code and country", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({}));
    await paymentService.getProductOfferingsByVoucherCode({
      customer: "CU",
      businessUnit: "BU",
      code: "123",
      countryCode: "SE"
    });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/CU/businessunit/BU/store/productofferings/country/SE/voucher/123`,
      {
        headers: {
          Authorization: ""
        }
      }
    );
  });
  it("should fetch purchases with correct url", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({}));
    await paymentService.getPurchases({ customer: "CU", businessUnit: "BU" });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/CU/businessunit/BU/store/purchase?includeOfferingDetails=false`,
      {
        headers: {
          Authorization: ""
        }
      }
    );
  });
});
