import { ResolvedComponent, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useSelectedLanguage } from "../../../src";

export const TextComponent = ({ component }: ResolvedComponent<"text">) => {
  const locale = useSelectedLanguage();
  return (
    <div className="container">
      <h3>{WLComponentHelpers.getDescription(component, locale)}</h3>
    </div>
  );
};
