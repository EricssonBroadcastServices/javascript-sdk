import React from "react";
import { AssetType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ResolvedComponent, EntitlementStatusResult } from "@ericssonbroadcastservices/app-sdk";
import { FavoriteButton } from "./FavoriteButton";
import {
  useAssetDisplay,
  useAssetDisplayCollection,
  useAssetDisplayTvShow,
  usePushNextContentData
} from "../../../src";
import { JsonBox } from "../../components/JsonBox";
import { PlayButton } from "./PlayButton";
import ChannelPicker from "../../components/ChannelPicker/ChannelPicker";
import "./asset-display.css";
import { Link } from "react-router-dom";
import { CarouselComponent } from "../Carousel/Carousel";
import AssetDisplayTagButton from "../TagButton/TagButton";

const Entitlements = ({ status }: { status: EntitlementStatusResult }) => {
  return (
    <>
      <PlayButton entitlementResult={status} />
      <JsonBox title={"Entitlement status"} json={JSON.stringify(status, null, 2)} />
    </>
  );
};

function AssetDisplayGeneric(props: ResolvedComponent<"asset_display">) {
  const asset = props.content;
  const { title, seriesTitle, seasonTitle, description, image, tags, entitlement, loadingEntitlement, progress } =
    useAssetDisplay(asset, {
      width: 800
    });
  const [pnc] = usePushNextContentData(asset.assetId);
  const { upNext, recommendations } = pnc || {};
  return (
    <>
      <div className="asset-display">
        <div className="asset-display-meta">
          <h1>{`${title}${loadingEntitlement ? " - loadingEntitlement" : ""}`}</h1>
          <h2>{seriesTitle && seasonTitle ? `${seriesTitle} - ${seasonTitle}` : seriesTitle}</h2>
          <p>{description}</p>
          <FavoriteButton assetId={asset.assetId} />
          <h4>{`Bookmark percentage: ${progress.percentage}`}</h4>
          <Entitlements status={entitlement} />
          <JsonBox json={JSON.stringify({ upNext, recommendations }, null, 2)} title="PNC Data" />
          {tags.map(id => {
            return <AssetDisplayTagButton tagId={id} key={id} />;
          })}
          {asset.participants.map(p => {
            if (!p.name) return;
            return (
              <Link key={p.name} to={`/participant/${p.name}`}>
                {p.name}
              </Link>
            );
          })}
        </div>
        <div className="asset-display-img-section">
          <img src={image}></img>
        </div>
      </div>
      {asset?.assetId && asset?.type === AssetType.TV_CHANNEL && <ChannelPicker selectedChannel={asset.assetId} />}
    </>
  );
}

function AssetDisplayCollection(props: ResolvedComponent<"asset_display">) {
  const asset = props.content;
  const { title, description, tags, image, trailerAssetId } = useAssetDisplayCollection(asset, { width: 800 });
  return (
    <>
      <div className="asset-display">
        <div className="asset-display-meta">
          <h1>{`${title}`}</h1>
          <p>{description}</p>
          {trailerAssetId && <p>{`Trailer asset id: ${trailerAssetId}`}</p>}
          <FavoriteButton assetId={asset.assetId} />
          {tags.map(id => {
            return (
              <Link to={`/tag/${id}`} key={id}>
                <button>{id}</button>
              </Link>
            );
          })}
        </div>
        <div className="asset-display-img-section">
          <img src={image}></img>
        </div>
      </div>
    </>
  );
}

function AssetDisplayTvShow(props: ResolvedComponent<"asset_display">) {
  const asset = props.content;
  const {
    title,
    description,
    tags,
    image,
    loadingEntitlement,
    loadingContinueWatching,
    progress,
    seasons,
    continueWatching,
    entitlement
  } = useAssetDisplayTvShow(asset, { width: 800 });

  const loading = loadingEntitlement || loadingContinueWatching;

  return (
    <>
      <div className="asset-display">
        <div className="asset-display-meta">
          <h1>{`${title}${loading ? " - loading" : ""}`}</h1>
          <p>{description}</p>
          <FavoriteButton assetId={asset.assetId} />
          <h4>{`Bookmark percentage: ${progress.percentage}`}</h4>
          <Entitlements status={entitlement} />
          <JsonBox json={JSON.stringify({ continueWatching }, null, 2)} title="Continue Watching asset" />
          {tags.map(id => {
            return (
              <Link to={`/tag/${id}`} key={id}>
                <button>{id}</button>
              </Link>
            );
          })}
          {asset.participants.map(p => {
            if (!p.name) return;
            return (
              <Link key={p.name} to={`/participant/${p.name}`}>
                {p.name}
              </Link>
            );
          })}
        </div>
        <div className="asset-display-img-section">
          <img src={image}></img>
        </div>
      </div>
      {seasons?.map(s => (
        <CarouselComponent key={s.component.id} {...s} />
      ))}
    </>
  );
}

export const AssetDisplay = (props: ResolvedComponent<"asset_display">) => {
  switch (props.content.type) {
    case AssetType.TV_SHOW:
      return <AssetDisplayTvShow {...props} />;
    case AssetType.COLLECTION:
      return <AssetDisplayCollection {...props} />;
    default:
      return <AssetDisplayGeneric {...props} />;
  }
};
