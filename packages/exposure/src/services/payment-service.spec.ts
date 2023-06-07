import { PaymentService } from "./payment-service";
import { ServiceOptions } from "./base-service";
import axios from "axios";

describe("Payment service", () => {
  const serviceOptions: ServiceOptions = {
    baseUrl: "https://testbaseurl.com",
    authHeader: () => ({ Authorization: "" })
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
      {}
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
      {}
    );
  });
  it("should fetch getAccountPurchases with correct url", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({}));
    await paymentService.getAccountPurchases({ customer: "CU", businessUnit: "BU" });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/CU/businessunit/BU/store/account/purchases`,
      { headers: { Authorization: "" } }
    );
  });
  it("should fetch getPurchases with correct url", async () => {
    jest.spyOn(axios, "get").mockReturnValue(Promise.resolve({}));
    await paymentService.getPurchases({ customer: "CU", businessUnit: "BU" });
    expect(axios.get).toHaveBeenCalledWith(
      `${serviceOptions.baseUrl}/v2/customer/CU/businessunit/BU/store/purchase?includeOfferingDetails=false`,
      { headers: { Authorization: "" } }
    );
  });
  describe("should fetch product offerings with countryCode", () => {
    it("should fetch offerings with countryCode only", async () => {
      jest.spyOn(axios, "get").mockReturnValue(Promise.resolve([]));
      await paymentService.getProductOfferingsByCountry({ customer: "CU", businessUnit: "BU", countryCode: "SE" });
      expect(axios.get).toHaveBeenCalledWith(
        `${serviceOptions.baseUrl}/v3/customer/CU/businessunit/BU/store/productoffering/country/SE?includeSelectAssetProducts=true`,
        {}
      );
    });
    it("should fetch offerings with countryCode and payment provider", async () => {
      jest.spyOn(axios, "get").mockReturnValue(Promise.resolve([]));
      await paymentService.getProductOfferingsByCountry({
        customer: "CU",
        businessUnit: "BU",
        countryCode: "SE",
        paymentProvider: "googleplay"
      });
      expect(axios.get).toHaveBeenCalledWith(
        `${serviceOptions.baseUrl}/v3/customer/CU/businessunit/BU/store/productoffering/country/SE?paymentProvider=googleplay&includeSelectAssetProducts=true`,
        {}
      );
    });
  });
});
