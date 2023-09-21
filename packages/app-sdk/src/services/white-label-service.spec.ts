import { DeviceGroup } from "../interfaces/device-group";
import { WhiteLabelService } from "./white-label-service";
import { WLConfig } from "../utils/wl-config";
import { IExposureWLPage } from "../interfaces/exposure-wl-page";
import { WLComponent } from "../utils/wl-component";
import { IExposureWLReference } from "../interfaces/exposure-wl-reference";
import { IExposureWLCarousel } from "../interfaces/exposure-wl-component";

const service = new WhiteLabelService({
  customer: "BSCU",
  businessUnit: "BSBU",
  baseUrl: "https://exposure.api.redbee.dev",
  deviceGroup: DeviceGroup.WEB,
  getAuthToken: () => Promise.resolve(undefined),
  errorFactory: (response: Response) => {
    return new Error(`HTTP Error: ${response.statusText} (${response.status}) for ${response.url}`);
  }
});

// @todo: add test for header footer, menu title

describe("WhiteLabelServices", () => {
  let appData: Awaited<ReturnType<typeof service.getEssentialAppData>>;
  let homePage: IExposureWLPage;
  it("getEssentialAppData returns the expected data shape", async () => {
    appData = await service.getEssentialAppData();
    expect(Object.keys(appData).sort()).toStrictEqual(["config", "countryCode", "footer", "menu", "systemConfig"]);
    expect(Object.values(appData).every(v => v && Object.keys(v).length)).toBeTruthy();
  });
  it("get home page ", async () => {
    const componentId = WLConfig.getHomePageId(appData.config) as string;
    expect(componentId).toBeTruthy();
    homePage = await service.getComponentById<IExposureWLPage>({
      componentId,
      countryCode: appData.countryCode
    });
    expect(homePage).toBeTruthy();
    expect(WLComponent.getTitle(homePage, "sv")).toBe("Hem");
  });
  it("finds a carousel component", async () => {
    const componentRef = homePage.components.pageBody.find(
      c => c.referenceId === "c225a4a3-14a7-4c90-99e8-74d958236502"
    );
    expect(componentRef).toBeTruthy();
    const carousel = await service.getComponentByReference<IExposureWLCarousel>({
      wlReference: componentRef as IExposureWLReference,
      countryCode: appData.countryCode
    });
    expect(WLComponent.getTitle(carousel, "sv")).toBe("Animerade kortfilmer");
    const assets = await service.getCarouselAssets(carousel);
    expect(assets).toEqual(expect.arrayContaining([expect.objectContaining({ assetId: expect.any(String) })]));
  });
});
