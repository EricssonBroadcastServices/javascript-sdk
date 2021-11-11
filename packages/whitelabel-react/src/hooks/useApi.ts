import { ExposureApi } from "@ericssonbroadcastservices/exposure-sdk";
import { WhiteLabelService } from "@ericssonbroadcastservices/whitelabel-sdk";
import { useContext } from "react";
import { RedBeeContext } from "..";
import { useRedBeeState } from "../RedBeeProvider";

export function useExposureApi(): ExposureApi {
  const { exposureApi } = useRedBeeState();
  return exposureApi;
}

export function useWLApi(): WhiteLabelService {
  const [{ whiteLabelApi }] = useContext(RedBeeContext);
  return whiteLabelApi;
}
