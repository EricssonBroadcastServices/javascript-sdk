import {Publication, LoginResponse} from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";
import { mockProduct, mockProductAnonymous } from "../../test-utils/mock-product";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { mockProductOffering } from "../../test-utils/mock-wl-productoffering";
import { mockTranslations } from "../../test-utils/mock-translations";

describe("wl asset", () => {
  describe("entitlement", () => {
    const asset = new WLAsset()
    asset.publications = [{ availabilityKeys: ["1", "2", "3"] } as Publication];
    it("should be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled(["1", "4"])).toBe(true);
    });
    it("should not be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled(["4", "5"])).toBe(false);
    });
    it("should not be entitled when in future", () => {
      spyOn(asset, "inFuture").and.returnValue(true);
      expect(asset.getIsEntitled(["1", "5"])).toBe(false);
    })
  });
  describe("metadata", () => {
    it("should render duration string", () => {
      const asset = new WLAsset();
      asset.duration = 60000;
      expect(asset.getDurationString()).toEqual("1min ");
      asset.duration = 60000 * 61;
      expect(asset.getDurationString()).toEqual("1h 1min ");
      asset.duration = 60000 * 61 + 1000;
      expect(asset.getDurationString()).toEqual("1h 1min 1sec");
      asset.duration = 500;
      expect(asset.getDurationString()).toEqual("");
    });
    it("should return friendly formatted starttime", () => {
      const asset = new WLAsset();
      const mockToday = new Date();
      const mockYesterday = new Date();
      mockYesterday.setDate(mockToday.getDate() - 1);
      const mockTomorrow = new Date();
      mockTomorrow.setDate(mockToday.getDate() + 1);
      expect(asset.getLocalStartDayString(mockTranslations)).toBe(null);
      asset.startTime = mockToday;
      expect(asset.getLocalStartDayString(mockTranslations)).toBe("Today");
      asset.startTime = mockYesterday;
      expect(asset.getLocalStartDayString(mockTranslations)).toBe("Yesterday");
      asset.startTime = mockTomorrow;
      expect(asset.getLocalStartDayString(mockTranslations)).toBe("Tomorrow");
    });
  });
  describe("entitlement", () => {
    let asset: WLAsset;
    beforeEach(() => {
      asset = new WLAsset();
      asset.publications = [
        {
          products: ["1", mockProduct.id],
          availabilityKeys: ["1"],
          fromDate: new Date(Date.now()),
          countries: []
        }
      ];
    });
    const mockLogin = new LoginResponse();
    it("should return NOT_LOGGED_IN", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(false);
      expect(asset.getEntitlementCase({
        availabilityKeys: ["1"],
        userEntitlements: [mockProduct],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: []
      })).toBe(EntitlementCase.NOT_LOGGED_IN);
    });
    it("should return IS_ENTITLED", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(asset.getEntitlementCase({
        availabilityKeys: ["1"],
        userEntitlements: [mockProduct],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: []
      })).toBe(EntitlementCase.IS_ENTITLED);
    });
    it("should return IN_FUTIRE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000);
      expect(asset.getEntitlementCase({
        availabilityKeys: ["1"],
        userEntitlements: [mockProduct],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: []
      })).toBe(EntitlementCase.IN_FUTURE);
    });
    it("should return IN_FUTIRE_NEED_PURCHASE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000);
      expect(asset.getEntitlementCase({
        availabilityKeys: [],
        userEntitlements: [],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: [mockProductOffering]
      })).toBe(EntitlementCase.IN_FUTURE_NEED_PURCHASE);
    });
    it("should return IS_ENTITLED_ANON", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(false);
      spyOn(mockLogin, "hasSession").and.returnValue(false);
      asset.publications.push({
        fromDate: new Date(),
        countries: [],
        products: [mockProductAnonymous.id],
        availabilityKeys: [mockProductAnonymous.id]
      })
      expect(asset.getEntitlementCase({
        availabilityKeys: [],
        userEntitlements: [mockProductAnonymous],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: [mockProductOffering]
      })).toBe(EntitlementCase.IS_ENTITLED_ANON);
    });
    it("should return NEED_PURCHASE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(asset.getEntitlementCase({
        availabilityKeys: [],
        userEntitlements: [],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: [mockProductOffering]
      })).toBe(EntitlementCase.NEED_PURCHASE);
    });
    it("should return NOT_ENTITLED", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(asset.getEntitlementCase({
        availabilityKeys: [],
        userEntitlements: [],
        paymentIsEnabled: true,
        login: mockLogin,
        availableProductOfferings: []
      })).toBe(EntitlementCase.NOT_ENTITLED);
    });
  });
});
