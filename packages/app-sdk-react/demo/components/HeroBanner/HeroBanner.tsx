import {
  IExposureWLHerobannerItem,
  ResolvedComponent,
  WLComponentHelpers,
  fit,
  fitToWidth
} from "@ericssonbroadcastservices/app-sdk";
import React, { useMemo } from "react";
import { useSelectedLanguage } from "../../../src";
import "./herobanner.css";
import { CarouselWrapper } from "../Carousel/Carousel";

function HeroBannerItem(item: IExposureWLHerobannerItem) {
  const locale = useSelectedLanguage();
  const imageUrl = useMemo(() => {
    const image = WLComponentHelpers.getImageByTag(item, "main", locale);
    if (image?.url) {
      return fitToWidth(image.url, 300);
    }
  }, [item]);
  const trailerAssetId = WLComponentHelpers.getTrailerAssetId(item, locale);
  return (
    <div className="item">
      <img src={imageUrl} />
      <div className="herobanner-meta">
        <h3>{WLComponentHelpers.getTitle(item, locale)}</h3>
        <p>{WLComponentHelpers.getDescription(item, locale)}</p>
        {trailerAssetId && <p>{`Trailer asset Id: ${trailerAssetId}`}</p>}
      </div>
    </div>
  );
}

export const HeroBanner = ({ component }: ResolvedComponent<"herobanner">) => {
  return (
    <CarouselWrapper>
      {component.components.heroBannerItems?.map((herobannerItem, i) => {
        return <HeroBannerItem key={i} {...herobannerItem} />;
      })}
    </CarouselWrapper>
  );
};
