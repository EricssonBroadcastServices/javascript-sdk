import { PropsWithChildren, useMemo } from "react";
import "./carousel.css";
import React from "react";
import {
  AssetHelpers,
  CarouselItem,
  PresentationImageOrientation,
  ResolvedComponent,
  fitToWidth,
  getTimeString
} from "@ericssonbroadcastservices/app-sdk";
import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useInitialCarouselIndex, useSelectedLanguage, useTranslations } from "../../../src";
import CarouselHeader from "./CarouselHeader";
import { useTagFeedFilter } from "../../../src";
import { Link } from "react-router-dom";
import { getDayLocalized } from "@ericssonbroadcastservices/app-sdk";

function getAspectRatioMultiplier(orientation: ImageOrientation) {
  if (orientation === "PORTRAIT") return 27.5 / 40.5;
  return 16 / 9;
}

function CarouselItem({
  item: { asset, startTime, endTime },
  orientation
}: {
  item: CarouselItem;
  orientation: ImageOrientation;
}) {
  const locale = useSelectedLanguage();
  const [translations] = useTranslations();
  const width = orientation === "LANDSCAPE" ? 400 : 200;
  return (
    <Link to={`/asset/${asset.assetId}`}>
      <div className="carousel-item">
        <img
          src={AssetHelpers.getScaledImage({
            width: width,
            height: width / getAspectRatioMultiplier(orientation),
            asset,
            imageType: "cover",
            orientation,
            locale
          })}
        />
        <div className="carousel-item-meta">
          {!!startTime && !!endTime && translations && (
            <span>{`${getDayLocalized(new Date(startTime), translations)}: ${getTimeString(
              new Date(startTime)
            )} - ${getTimeString(new Date(endTime))}`}</span>
          )}

          <h4>{AssetHelpers.getTitle(asset, locale)}</h4>
          <p>{AssetHelpers.getShortDescription(asset, locale)}</p>
        </div>
      </div>
    </Link>
  );
}

function convertImageOrientation(o: PresentationImageOrientation): ImageOrientation {
  if (o === "portrait") return "PORTRAIT";
  return "LANDSCAPE";
}

export function CarouselComponent(props: ResolvedComponent<"carousel">) {
  const [assets, setTagFilter] = useTagFeedFilter(props.content);

  if (!props.content.length) return null;
  const orientation = convertImageOrientation(props.presentationParameters.imageOrientation);
  const bgImage = useMemo(() => {
    if (props.presentationParameters.backgroundImage?.url) {
      return `url(${fitToWidth(props.presentationParameters.backgroundImage?.url, 1000)})`;
    }
  }, [props.presentationParameters.backgroundImage?.url]);

  const initialIndex = useInitialCarouselIndex(assets);

  return (
    <div
      className="carousel-component-container"
      style={{
        backgroundColor: props.presentationParameters.backgroundColor,
        backgroundImage: bgImage
      }}
    >
      <CarouselHeader setTagFilter={setTagFilter} component={props.component} />
      <h3>Initial index: {initialIndex}</h3>
      <CarouselWrapper>
        {assets.map(item => (
          <CarouselItem orientation={orientation} key={item.asset.assetId} item={item} />
        ))}
      </CarouselWrapper>
    </div>
  );
}

export function CarouselWrapper(props: PropsWithChildren) {
  return <div className="carousel">{props.children}</div>;
}
