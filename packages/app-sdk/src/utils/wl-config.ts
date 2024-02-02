import { IExposureWLConfig } from "../interfaces/exposure-wl-config.js";

export function getHomePageIdFromWLConfig(config: IExposureWLConfig): string | undefined {
  return config.components.homePage?.[0].referenceId;
}

export const WLConfig = {
  getHomePageId: getHomePageIdFromWLConfig
};
