import { getLocationFromReferer, getSystemConfigV2 } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLFooter, IExposureWLMenu } from "../../interfaces/exposure-wl-menu";
import { getConfigByCustomerAndBusinessUnit } from "./get-config-by-customer-and-businessUnit";
import { getComponentByReference } from "./get-component-by-reference";
import { EssentialAppData } from "../../interfaces/essential-app-data";

export async function getEssentialAppData(context: WhiteLabelServiceContext): Promise<EssentialAppData> {
  const location = await getLocationFromReferer.call(context);
  const { countryCode } = location;
  if (!countryCode) {
    throw Error("Couldn't get all the things");
  }
  const systemConfigRequest = getSystemConfigV2.call(context, { countryCode });
  const config = await getConfigByCustomerAndBusinessUnit(context, { countryCode });
  const menuReference = config.components.menu?.[0];
  const footerReference = config.components.footer?.[0];
  let footerRequest: Promise<IExposureWLFooter> | undefined;
  if (!menuReference) {
    throw new Error("nOoooo!");
  }
  const menuRequest = getComponentByReference<IExposureWLMenu>(context, { wlReference: menuReference, countryCode });
  if (footerReference) {
    footerRequest = getComponentByReference<IExposureWLFooter>(context, { wlReference: footerReference, countryCode });
  }

  const [systemConfig, menu, footer] = await Promise.all([systemConfigRequest, menuRequest, footerRequest]);

  return {
    systemConfig,
    menu,
    footer,
    countryCode,
    config
  };
}
