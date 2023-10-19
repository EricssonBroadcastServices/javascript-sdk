import { SystemConfig, getLocationFromReferer, getSystemConfigV2 } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { WhiteLabelServiceContext } from "../white-label-service";
import { IExposureWLFooter, IExposureWLMenu } from "../../interfaces/exposure-wl-menu";
import { IExposureWLConfig } from "../../interfaces/exposure-wl-config";
import { getConfigByCustomerAndBusinessUnit } from "./get-config-by-customer-and-businessUnit";
import { getComponentByReference } from "./get-component-by-reference";

export interface EssentialAppData {
  systemConfig: SystemConfig;
  menu: IExposureWLMenu;
  footer: IExposureWLFooter | undefined;
  countryCode: string;
  config: IExposureWLConfig;
}

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

  return {
    systemConfig: await systemConfigRequest,
    menu: await menuRequest,
    footer: await footerRequest,
    countryCode,
    config
  };
}
