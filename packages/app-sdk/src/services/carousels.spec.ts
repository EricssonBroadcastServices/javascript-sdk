import { DeviceRegistration, getAsset, login } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { expectAsset } from "../../test-utils/expectations";
import { DeviceGroup } from "../interfaces/device-group";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import { WhiteLabelService } from "./white-label-service";
import { WLComponentHelpers } from "../utils/wl-component";

function expectIsAssetList(assets: any[]) {
  assets.forEach(({ asset }) => {
    expect(asset).toEqual(
      expect.objectContaining({
        assetId: expect.any(String),
        type: expect.any(String)
      })
    );
    expect(Array.isArray(asset.localized)).toBe(true);
    expect(Array.isArray(asset.participants)).toBe(true);
  });
}

let sessionToken;

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(sessionToken),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

const device: DeviceRegistration = {
  deviceId: "123",
  name: "e2etestDevice"
};

// @todo: add test for header footer, menu title

describe("get carousel assets", () => {
  beforeAll(async () => {
    const session = await login.call(service.context, {
      username: "simon.wallin1@mailinator.com",
      password: "SimonTest",
      device
    });
    sessionToken = session.sessionToken;
  });
  it("finds and gets a continue watching carousel", async () => {
    const continueId = "5e3bc28b-54e1-4ef1-818b-61e661e1107e";
    const component = await service.getComponentById({ componentId: continueId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a recommended carousel", async () => {
    const recommededId = "2e1a8659-9dc3-4d4f-8e1a-e86ab135d8a6";
    const component = await service.getComponentById({ componentId: recommededId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets an epg carousel", async () => {
    const epgId = "1de25d1f-e64f-4d2c-bd40-5a7dff28c53e";
    const component = await service.getComponentById({ componentId: epgId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a favourites carousel", async () => {
    const favId = "4e3ef64c-c802-4d9e-b3ac-f54f0a656f5d";
    const component = await service.getComponentById({ componentId: favId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("finds and gets a tvod carousel", async () => {
    const tvodId = "23c7fb5e-993c-4652-8ea1-47a949d5c271";
    const component = await service.getComponentById({ componentId: tvodId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("should get an event carousel", async () => {
    // TODO: figure out how to test event carousel
  });
  it("should get a tag feed carousel", async () => {
    const tagFeedId = "618d6243-abf0-43a2-bb33-098e22e9c624";
    const component = await service.getComponentById({ componentId: tagFeedId, countryCode: "SE" });
    const assets = await service.getCarouselAssets(component);
    expectIsAssetList(assets);
  });
  it("resolves carousel content", async () => {
    const carouselRef: IExposureWLReference = {
      name: "Home - Shortfilms Carousel",
      appType: "carousel",
      appSubType: "TagsQuery",
      referenceId: "c225a4a3-14a7-4c90-99e8-74d958236502",
      referenceUrl:
        "/v2/whitelabel/customer/BSCU/businessunit/BSBU/config/sandwich/component/c225a4a3-14a7-4c90-99e8-74d958236502",
      parameters: {
        carouselLayout: "carousel",
        imageOrientation: "landscape",
        density: "MEDIUM",
        backgroundColor: "#a14f4f"
      },
      images: [
        {
          url: "https://ps-vemup-ctl.cdn.redbee.live/imagescaler002/bscu/bsbu/configimages/f79ca0eb-bf91-4683-8f38-bf64460480c5.jpg",
          tags: ["background"]
        }
      ],
      hasAuthorizedContent: false
    };
    const resolved = await service.getResolvedComponentByReference<"carousel">({
      wlReference: carouselRef,
      countryCode: "SE"
    });
    expect(resolved.presentationParameters.backgroundImage).toBe(carouselRef.images?.[0]);
    resolved.content?.forEach(caruoselItem => {
      expect(caruoselItem.asset).toEqual(expectAsset());
    });
  });
  it("gets a generated carousel by tagId", async () => {
    const generatedCarousel = await service.getGeneratedCarouselByTagId({ tagId: "2d-animation_82162E", locale: "en" });
    generatedCarousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
    expect(
      generatedCarousel.content.map(c => c.asset.assetId).includes("fed25f86-6ada-47b2-9b41-98837042568e_82162E")
    ).toBe(true);
  });
  it("gets a generated carousel by tagId but excludes an asset", async () => {
    const generatedCarousel = await service.getGeneratedCarouselByTagId({
      excludedAssetId: "fed25f86-6ada-47b2-9b41-98837042568e_82162E",
      tagId: "2d-animation_82162E",
      locale: "en"
    });
    generatedCarousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
    expect(
      generatedCarousel.content.map(c => c.asset.assetId).includes("fed25f86-6ada-47b2-9b41-98837042568e_82162E")
    ).toBe(false);
  });
  it("get a generated epg carousel from assetId", async () => {
    const translations = await service.getTranslations("en");
    const generatedCarousel = await service.getGeneratedEpgCarouselFromAssetId({
      assetId: "89bff8fb_82162E",
      translations
    });
    generatedCarousel.content.forEach(carouselItem => {
      expect(new Date(carouselItem.startTime as string).getTime()).not.toEqual(NaN);
      expect(new Date(carouselItem.endTime as string).getTime()).not.toEqual(NaN);
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });
  it("gets a generated season carousel", async () => {
    const tvShowId = "a82e0a7c-1ebc-4f3e-901a-90e1bcc4f089_82162E";
    const carousel = await service.getGeneratedSeasonCarousel({
      tvShowId: "a82e0a7c-1ebc-4f3e-901a-90e1bcc4f089_82162E",
      seasonNumber: 1,
      locale: "en"
    });
    carousel.content.forEach(carouselItem => {
      expect(carouselItem.asset.tvShowId).toEqual(tvShowId);
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });
  it("gets a generated collection entries carousel", async () => {
    const carousel = await service.getGeneratedCollectionEntriesCarousel({
      assetId: "0fa65042-95c0-41ab-86b3-0262d131933e_82162E"
    });
    expect(carousel.content.length).toEqual(2);
    carousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });
  it("gets a generated by metadata carousel", async () => {
    const translations = await service.getTranslations("en");
    const asset = await getAsset.call(service.context, { assetId: "9086ffab-377f-4e2f-84dc-a597e6a2e8a8_82162E" });
    const carousel = await service.getGeneratedByMetadataCarousel({ asset, service, translations });
    expect(WLComponentHelpers.getTitle(carousel.component, "en")).toBe(
      translations.getText(["CAROUSEL_TITLE", "RELATED"])
    );
    carousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });

  it("gets a generated trailers and extras carousel", async () => {
    const translations = await service.getTranslations("en");
    const carousel = await service.getGeneratedTrailersForAssetCarousel({
      assetId: "agent-327-with-subtitles_82162E",
      locale: "en",
      translations
    });
    expect(WLComponentHelpers.getTitle(carousel.component, "en")).toBe(
      translations.getText(["CAROUSEL_TITLE", "TRAILERS"])
    );
    expect(carousel.content.length).toBe(3);
    carousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });
  it("gets an others have watched carousel", async () => {
    const translations = await service.getTranslations("en");
    const carousel = await service.getGeneratedOthersHaveWatchedCarousel({
      assetId: "agent-327-with-subtitles_82162E",
      service,
      translations
    });
    expect(WLComponentHelpers.getTitle(carousel.component, "en")).toBe(
      translations.getText(["CAROUSEL_TITLE", "OTHERS_HAVE_WATCHED"])
    );
    carousel.content.forEach(carouselItem => {
      expect(carouselItem.asset).toEqual(expectAsset());
    });
  });
});
