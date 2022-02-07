import { LoginResponse, deserialize } from "@ericssonbroadcastservices/exposure-sdk";
import { WLAsset } from "./wl-asset";
import { mockProduct, mockProductAnonymous } from "../../test-utils/mock-product";
import { EntitlementCase } from "../interfaces/entitlement-cases";
import { mockProductOffering, mockProductOfferingGenerator } from "../../test-utils/mock-wl-productoffering";
import { mockTranslations } from "../../test-utils/mock-translations";
import {
  freeProduct,
  publicationsJson,
  product1,
  mockMultiplePublicationWindows
} from "@ericssonbroadcastservices/exposure-sdk/test-utils/mockPublication";
// import { it } from "date-fns/locale";

describe("wl asset", () => {
  describe("entitlement", () => {
    const asset = new WLAsset();
    asset.publications = publicationsJson;
    it("should be entitled", () => {
      jest.spyOn(asset, "inFuture").mockReturnValue(false);
      expect(asset.getIsEntitled([product1, "4"])).toBe(true);
    });
    it("should not be entitled", () => {
      jest.spyOn(asset, "inFuture").mockReturnValue(false);
      expect(asset.getIsEntitled([freeProduct, "5"])).toBe(false);
    });
    it("should not be entitled when in future", () => {
      jest.spyOn(asset, "inFuture").mockReturnValue(true);
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
      expect(asset.productionCountries).toEqual([{ code: "SE", name: "Sweden" }]);
    });
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
        {
          products: ["1", mockProduct.id],
          availabilityKeys: ["1"],
          fromDate: new Date(Date.now() - 60 * 60000).toString(),
          toDate: new Date(Date.now() + 60 * 60000).toString(),
          countries: [],
          publicationId: ""
        }
      ];
      mockLogin = new LoginResponse();
    });
    it("should return NOT_LOGGED_IN", () => {
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(false);
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(true);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(true);
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(true);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000).toUTCString();
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(true);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(true);
      asset.publications[0].fromDate = new Date(Date.now() + 60000).toUTCString();
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(false);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(false);
      asset.publications.push({
        fromDate: new Date(Date.now() - 60 * 60000).toString(),
        toDate: new Date(Date.now() + 60 * 60000).toString(),
        countries: [],
        products: [mockProductAnonymous.id],
        availabilityKeys: [mockProductAnonymous.id],
        publicationId: ""
      });
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(true);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(true);
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
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(true);
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(true);
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
      jest.spyOn(mockLogin, "hasSession").mockReturnValue(false);
      jest.spyOn(mockLogin, "isLoggedIn").mockReturnValue(false);
      asset.publications = [
        {
          fromDate: new Date(Date.now() + 30 * 60000).toString(),
          toDate: new Date(Date.now() + 60 * 60000).toString(),
          countries: [],
          products: [mockProductAnonymous.id],
          availabilityKeys: [mockProductAnonymous.id],
          publicationId: ""
        }
      ];
      expect(
        asset.getEntitlementCase({
          login: mockLogin,
          availabilityKeys: [mockProductAnonymous.id],
          userEntitlements: [mockProductAnonymous],
          paymentIsEnabled: true,
          availableProductOfferings: []
        })
      ).toBe(EntitlementCase.IN_FUTURE);
    });
  });
  describe("EPG Progress", () => {
    it("", () => {
      const asset = new WLAsset();
      asset.startTime = new Date();
      asset.endTime = new Date(Date.now() + 60 * 1000);
      expect(asset.getEPGProgress(asset.startTime.getTime() + 30000)).toBe(50);
    });
  });

  describe("publication windows", () => {
    const asset = new WLAsset();
    asset.publications = mockMultiplePublicationWindows;
    it("should have start time according to its next upcoming publication", () => {
      expect(asset.getStartTime()).toEqual(new Date(asset.getNextPublications()[0].fromDate));
    });
    it("should have a sub set as next window", () => {
      const total = asset.publications.length;
      const nextWindow = asset.getNextPublications();
      expect(nextWindow.length).toBeLessThan(total);
    });
    it("should only get buyable products for the next publication window", () => {
      const productOfferings = [
        mockProductOfferingGenerator("MEMBER_123"),
        mockProductOfferingGenerator("PVOD_123"),
        mockProductOfferingGenerator("SVOD_123"),
        mockProductOfferingGenerator("TVOD_123")
      ];
      const offerings = asset.getBuyableProductOfferings(productOfferings);
      const offeringIds: string[] = [];
      offerings.forEach(o => {
        o.productIds.forEach(pid => {
          offeringIds.push(pid);
        });
      });
      expect(offeringIds).toContain("PVOD_123");
    });
  });
});
