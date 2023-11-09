import { ResolvedComponent, WLComponentHelpers, fitToWidth } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import "./image.css";
import { useSelectedLanguage } from "../../../src";

export const ImageComponent = ({ component }: ResolvedComponent<"image">) => {
  const locale = useSelectedLanguage();
  const imageUrl = WLComponentHelpers.getImageByTag(component, "image", locale)?.url;
  if (!imageUrl) return null;
  return (
    <div className="container">
      <img src={fitToWidth(imageUrl, 1000)} />
      <div className="image-meta">
        <h3>{WLComponentHelpers.getTitle(component, locale)}</h3>
        <p>{WLComponentHelpers.getDescription(component, locale)}</p>
      </div>
    </div>
  );
};
