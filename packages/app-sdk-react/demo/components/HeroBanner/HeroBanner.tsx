import { IExposureWLHerobannerItem, ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { useHerobannerItem } from "../../../src";
import "./herobanner.css";
import { CarouselWrapper } from "../Carousel/Carousel";

function HeroBannerItem(item: IExposureWLHerobannerItem) {
  const { title, description, image, trailerAssetId } = useHerobannerItem(item, {
    width: 300
  });
  return (
    <div className="item">
      <img src={image} />
      <div className="herobanner-meta">
        <h3>{title}</h3>
        <p>{description}</p>
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
