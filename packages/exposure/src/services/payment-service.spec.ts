import { PaymentService } from "./payment-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";

describe("Payment service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "testBaseUrl",
    authHeader: () => ({ Authorization: "" })
  };
  const paymentService = new PaymentService(serviceOptions);
  it("should fetch product offerings with voucher code", async () => {
    spyOn(axios, "get").and.returnValue(Promise.resolve({}));
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
    spyOn(axios, "get").and.returnValue(Promise.resolve({}));
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
});