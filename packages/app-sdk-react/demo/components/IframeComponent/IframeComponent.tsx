import { ResolvedComponent, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useSelectedLanguage } from "../../../src";

export const IframeComponent = ({ component }: ResolvedComponent<"iframe">) => {
  const locale = useSelectedLanguage();
  const iframe = WLComponentHelpers.getIframe(component, locale);
  if (!iframe) return null;
  return (
    <div className="container">
      <iframe width={"100%"} height={iframe.height} src={iframe.url} />
    </div>
  );
};
