import { getLocationFromReferer, getSystemConfigV2 } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { IExposureWLFooter, IExposureWLMenu } from "../../interfaces/exposure-wl-menu.js";
import { getComponentByReference } from "./get-component-by-reference.js";
import { EssentialAppData } from "../../interfaces/essential-app-data.js";
import { getConfigByOrigin } from "./get-config-by-origin.js";
import { WhiteLabelServiceContext } from "../white-label-service.js";

export type GetEssentialAppDataByOriginOptions = {
  hostname: string;
  origin: string;
  devBaseUrl: string;
  liveBaseUrl: string;
};

function cleanHostName(hostname: string) {
  if (hostname.startsWith("https://")) return hostname.replace("https://", "");
  if (hostname.startsWith("http://")) return hostname.replace("http://", "");
  return hostname;
}

export async function getEssentialAppDataByOrigin(
  context: Omit<WhiteLabelServiceContext, "customer" | "businessUnit">,
  { hostname, devBaseUrl, liveBaseUrl }: GetEssentialAppDataByOriginOptions
): Promise<EssentialAppData & { context: WhiteLabelServiceContext }> {
  const location = await getLocationFromReferer.call(context);
  const { countryCode } = location;
  if (!countryCode) {
    throw Error("Could not resolve geo location");
  }
  const config = await getConfigByOrigin(context, { countryCode, origin: cleanHostName(hostname) });

  // create a new context with correct customer/busiessUnit/baseUrl
  const newContext: WhiteLabelServiceContext = {
    ...context,
    customer: config.customer,
    businessUnit: config.businessUnit,
    baseUrl: !!config.systemConfig.production ? liveBaseUrl : devBaseUrl
  };

  const menuReference = config.components.menu?.[0];
  const footerReference = config.components.footer?.[0];

  const systemConfigRequest = getSystemConfigV2.call(newContext, { countryCode });
  let footerRequest: Promise<IExposureWLFooter> | undefined;
  if (!menuReference) {
    throw new Error("Found no configured menu component");
  }
  const menuRequest = getComponentByReference<IExposureWLMenu>(newContext, { wlReference: menuReference, countryCode });
  if (footerReference) {
    footerRequest = getComponentByReference<IExposureWLFooter>(newContext, {
      wlReference: footerReference,
      countryCode
    });
  }

  const [systemConfig, menu, footer] = await Promise.all([systemConfigRequest, menuRequest, footerRequest]);

  return {
    systemConfig,
    menu,
    footer,
    countryCode,
    config,
    context: newContext
  };
}
