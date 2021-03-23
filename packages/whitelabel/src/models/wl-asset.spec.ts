import { Publication, LoginResponse, deserialize } from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";
import { mockProduct, mockProductAnonymous } from "../../test-utils/mock-product";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { mockProductOffering } from "../../test-utils/mock-wl-productoffering";
import { mockTranslations } from "../../test-utils/mock-translations";
import { freeProduct, mockPublications, product1 } from "@ericssonbroadcastservices/exposure-sdk/test-utils/mockPublication";

describe("wl asset", () => {
  describe("entitlement", () => {
    const asset = new WLAsset();
    asset.publications = mockPublications;
    it("should be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled([product1, "4"])).toBe(true);
    });
    it("should not be entitled", () => {
      spyOn(asset, "inFuture").and.returnValue(false);
      expect(asset.getIsEntitled([freeProduct, "5"])).toBe(false);
    });
    it("should not be entitled when in future", () => {
      spyOn(asset, "inFuture").and.returnValue(true);
      expect(asset.getIsEntitled(["1", "5"])).toBe(false);
    });
  });
  describe("metadata", () => {
    it("should render duration string", () => {
      const asset = new WLAsset();
      asset.duration = 60000;
      expect(asset.getDurationString()).toEqual("1 minute");
      asset.duration = 60000 * 61;
      expect(asset.getDurationString()).toEqual("1 hour, 1 minute");
      asset.duration = 60000 * 61 + 1000;
      expect(asset.getDurationString()).toEqual("1 hour, 1 minute, 1 second");
      asset.duration = 500;
      expect(asset.getDurationString()).toEqual("1 second");
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
    it("should deserialize production countries", () => {
      const asset = deserialize(WLAsset, { productionCountries: [{ code: "SE", name: "Sweden" }] });
      expect(asset.productionCountries).toEqual([{ code: "SE", name: "Sweden" }])
    })
  });
  describe("epg", () => {
    describe("getTimeSlot()", () => {
      it("Returns HH:mm", () => {
        const asset = new WLAsset();
        const mockStartTime = new Date();
        const mockEndTime = new Date();
        asset.startTime = mockStartTime;
        asset.endTime = mockEndTime;

        mockStartTime.setHours(14);
        mockStartTime.setMinutes(15);
        mockEndTime.setHours(15);
        mockEndTime.setMinutes(45);

        expect(asset.getTimeSlot()).toBe("14:15 - 15:45");
      });
    });
    describe("getEPGProgress()", () => {
      it("Returns 0 when program hasn't started", () => {
        const asset = new WLAsset();
        const mockStartTime = new Date();
        const mockEndTime = new Date();
        asset.startTime = mockStartTime;
        asset.endTime = mockEndTime;

        mockStartTime.setHours(mockStartTime.getHours() + 1);
        mockEndTime.setHours(mockEndTime.getHours() + 2);

        expect(asset.getEPGProgress()).toBe(0);
      });

      it("Returns a valid when there has been some progress", () => {
        const asset = new WLAsset();
        const mockNow = new Date("2020-04-20 18:45:00");
        const mockStartTime = new Date("2020-04-20 18:30:00");
        const mockEndTime = new Date("2020-04-20 19:30:00");

        asset.startTime = mockStartTime;
        asset.endTime = mockEndTime;

        expect(asset.getEPGProgress(mockNow.getTime())).toBe(25);
      });

      it("Returns 100 when program is ended", () => {
        const asset = new WLAsset();
        const mockStartTime = new Date();
        const mockEndTime = new Date();
        asset.startTime = mockStartTime;
        asset.endTime = mockEndTime;

        mockStartTime.setHours(mockStartTime.getHours() - 2);
        mockEndTime.setHours(mockEndTime.getHours() - 1);

        expect(asset.getEPGProgress()).toBe(100);
      });
    });
  });
  describe("entitlement", () => {
    let asset: WLAsset;
    let mockLogin: LoginResponse;
    beforeEach(() => {
      asset = new WLAsset();
      asset.publications = [
        deserialize(Publication, {
          products: ["1", mockProduct.id],
          availabilityKeys: ["1"],
          fromDate: new Date(Date.now() - 60 * 60000),
          toDate: new Date(Date.now() + 60 * 60000),
          countries: []
        })
      ];
      mockLogin = new LoginResponse();
    });
    it("should return NOT_LOGGED_IN", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(false);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: ["1"],
          userEntitlements: [mockProduct],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: []
        })
      ).toBe(EntitlementCase.NOT_LOGGED_IN);
    });
    it("should return IS_ENTITLED", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: ["1"],
          userEntitlements: [mockProduct],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: []
        })
      ).toBe(EntitlementCase.IS_ENTITLED);
    });
    it("should return IN_FUTIRE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: ["1"],
          userEntitlements: [mockProduct],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: []
        })
      ).toBe(EntitlementCase.IN_FUTURE);
    });
    it("should return IN_FUTIRE_NEED_PURCHASE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: [],
          userEntitlements: [],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: [mockProductOffering]
        })
      ).toBe(EntitlementCase.IN_FUTURE_NEED_PURCHASE);
    });
    it("should return IS_ENTITLED_ANON", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(false);
      spyOn(mockLogin, "hasSession").and.returnValue(false);
      asset.publications.push(deserialize(Publication, {
        fromDate: new Date(Date.now() - 60 * 60000),
        toDate: new Date(Date.now() + 60 * 60000),
        countries: [],
        products: [mockProductAnonymous.id],
        availabilityKeys: [mockProductAnonymous.id]
      }));
      expect(
        asset.getEntitlementCase({
          availabilityKeys: [],
          userEntitlements: [mockProductAnonymous],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: [mockProductOffering]
        })
      ).toBe(EntitlementCase.IS_ENTITLED_ANON);
    });
    it("should return NEED_PURCHASE", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: [],
          userEntitlements: [],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: [mockProductOffering]
        })
      ).toBe(EntitlementCase.NEED_PURCHASE);
    });
    it("should return NOT_ENTITLED", () => {
      spyOn(mockLogin, "isLoggedIn").and.returnValue(true);
      spyOn(mockLogin, "hasSession").and.returnValue(true);
      expect(
        asset.getEntitlementCase({
          availabilityKeys: [],
          userEntitlements: [],
          paymentIsEnabled: true,
          login: mockLogin,
          availableProductOfferings: []
        })
      ).toBe(EntitlementCase.NOT_ENTITLED);
    });
    it("should be IN_FUTURE when entitled anon and in future", () => {
      spyOn(mockLogin, "hasSession").and.returnValue(false);
      spyOn(mockLogin, "isLoggedIn").and.returnValue(false);
      asset.publications = [deserialize(Publication, {
        fromDate: new Date(Date.now() + 30 * 60000),
        toDate: new Date(Date.now() + 60 * 60000),
        countries: [],
        products: [mockProductAnonymous.id],
        availabilityKeys: [mockProductAnonymous.id]
      })]
      expect(asset.getEntitlementCase({
        login: mockLogin,
        availabilityKeys: [mockProductAnonymous.id],
        userEntitlements: [mockProductAnonymous],
        paymentIsEnabled: true,
        availableProductOfferings: []
      })).toBe(EntitlementCase.IN_FUTURE);
    });
  });
});
