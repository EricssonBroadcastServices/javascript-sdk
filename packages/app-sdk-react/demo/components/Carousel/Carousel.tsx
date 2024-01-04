import { PropsWithChildren, useMemo } from "react";
import "./carousel.css";
import React from "react";
import {
  AssetHelpers,
  CarouselItem,
  ChannelAssetHelpers,
  PresentationImageOrientation,
  ResolvedComponent,
  fitToWidth,
  getTimeString,
  TagHelpers
} from "@ericssonbroadcastservices/app-sdk";
import { ChannelAsset, ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useInitialCarouselIndex, useSelectedLanguage, useTag, useTranslations } from "../../../src";
import CarouselHeader from "./CarouselHeader";
import { useTagFeedFilter } from "../../../src";
import { Link } from "react-router-dom";
import { getDayLocalized } from "@ericssonbroadcastservices/app-sdk";

function getAspectRatioMultiplier(orientation: ImageOrientation) {
  if (orientation === "PORTRAIT") return 27.5 / 40.5;
  return 16 / 9;
}

function Tag({ tagId }: { tagId: string }) {
  const [tag] = useTag(tagId);
  const selectedLanguage = useSelectedLanguage();
  if (!tag) {
    return null;
  }
  return <p className="carousel-item-tag">{TagHelpers.getTitle(tag, selectedLanguage)}</p>;
}

function CarouselItem({ item, orientation }: { item: CarouselItem; orientation: ImageOrientation }) {
  const { asset, startTime, endTime } = item;
  const locale = useSelectedLanguage();
  const [translations] = useTranslations();
  const width = orientation === "LANDSCAPE" ? 400 : 200;
  return (
    <Link to={`/asset/${asset.assetId}`}>
      <div className="carousel-item">
        {ChannelAssetHelpers.isLive(item as ChannelAsset) && <div>LIVE</div>}
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
          <div className="carousel-item-tag-container">
            {asset.tags.map((tag, index) => (
              <Tag key={index} tagId={tag.tagValues[0]?.tagId} />
            ))}
          </div>

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
