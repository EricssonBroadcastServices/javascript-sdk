import { ResolvedComponent, WLComponentHelpers, fitToWidth } from "@ericssonbroadcastservices/app-sdk";
import React, { useMemo } from "react";
import "./image.css";
import { useSelectedLanguage } from "../../../src";

export const ImageComponent = ({ component }: ResolvedComponent<"image">) => {
  const locale = useSelectedLanguage();
  const imageUrl = useMemo(() => {
    const image =
      WLComponentHelpers.getImageByTag(component, "image", locale) || component.presentation?.fallback?.images?.[0];
    return image?.url;
  }, [component]);
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
