import { PropsWithChildren, useMemo } from "react";
import "./carousel.css";
import React from "react";
import {
  CarouselItem,
  PresentationImageOrientation,
  ResolvedComponent,
  fitToWidth,
  TagHelpers
} from "@ericssonbroadcastservices/app-sdk";
import { ImageOrientation } from "@ericssonbroadcastservices/rbm-ott-sdk";
import {
  useBookmarkPercentage,
  useCarouselItem,
  useInitialCarouselIndex,
  useSelectedLanguage,
  useTag
} from "../../../src";
import CarouselHeader from "./CarouselHeader";
import { useTagFeedFilter } from "../../../src";
import { Link } from "react-router-dom";

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

export function CarouselItem({
  item,
  orientation,
  goDirectlyToPlay
}: {
  item: CarouselItem;
  orientation: ImageOrientation;
  goDirectlyToPlay: boolean;
}) {
  const width = orientation === "LANDSCAPE" ? 400 : 200;
  const height = width / getAspectRatioMultiplier(orientation);
  const { assetId, image, startDay, startTime, tags, title, description, isLive, logo, progress } = useCarouselItem(
    item,
    {
      orientation,
      width,
      height,
      onNowInfoUpdateInterval: 60_000
    }
  );

  const [percentage] = useBookmarkPercentage(item.asset.assetId, item.asset.duration);

  const assetProgress = progress || percentage;
  return (
    <Link to={`/${goDirectlyToPlay ? "play" : "asset"}/${assetId}`}>
      <div className="carousel-item">
        {isLive && <div>LIVE</div>}
        <img src={image} />
        {logo && <img style={{ position: "absolute", top: "10px", right: "10px" }} src={logo} />}
        <div className="carousel-item-meta">
          {startTime && <span>{`${startDay || ""} ${startTime}`}</span>}
          <div className="carousel-item-tag-container">
            {tags.map((tag, index) => (
              <Tag key={index} tagId={tag} />
            ))}
          </div>

          <h4>{title}</h4>
          <p>{description}</p>
          {assetProgress && <p>Progress: {assetProgress}%</p>}
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

  const orientation = convertImageOrientation(props.presentationParameters.imageOrientation);
  const bgImage = useMemo(() => {
    if (props.presentationParameters.backgroundImage?.url) {
      return `url(${fitToWidth(props.presentationParameters.backgroundImage?.url, 1000)})`;
    }
  }, [props.presentationParameters.backgroundImage?.url]);

  const initialIndex = useInitialCarouselIndex(assets);

  if (!props.content.length) return null;

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
          <CarouselItem
            goDirectlyToPlay={props.component.parameters?.carouselNavigation === "PLAY"}
            orientation={orientation}
            key={item.asset.assetId}
            item={item}
          />
        ))}
      </CarouselWrapper>
    </div>
  );
}

export function CarouselWrapper(props: PropsWithChildren) {
  return <div className="carousel">{props.children}</div>;
}
