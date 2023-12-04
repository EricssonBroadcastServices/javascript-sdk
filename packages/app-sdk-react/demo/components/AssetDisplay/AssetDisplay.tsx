import React, { useMemo } from "react";
import { Asset, AssetType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import {
  AssetHelpers,
  ResolvedComponent,
  WLCarouselHelpers,
  getTitleFromAsset
} from "@ericssonbroadcastservices/app-sdk";
import { FavoriteButton } from "./FavoriteButton";
import {
  useBookmarkPercentage,
  useContinueWatching,
  useEntitlementForAsset,
  usePushNextContentData,
  useSelectedLanguage
} from "../../../src";
import { JsonBox } from "../../components/JsonBox";
import { PlayButton } from "./PlayButton";
import ChannelPicker from "../../components/ChannelPicker/ChannelPicker";
import "./asset-display.css";
import { Link } from "react-router-dom";
import { CarouselComponent } from "../Carousel/Carousel";

const Entitlements = ({ asset }: { asset: Asset }) => {
  const [status] = useEntitlementForAsset({ asset }, {});
  return (
    <>
      <PlayButton entitlementResult={status} />
      <JsonBox title={"Entitlement status"} json={JSON.stringify(status, null, 2)} />
    </>
  );
};

export const AssetDisplay = ({ content }: ResolvedComponent<"asset_display">) => {
  const asset = content;
  const language = useSelectedLanguage();
  const [bookmarkPercentage] = useBookmarkPercentage(asset.assetId);
  const [pnc] = usePushNextContentData(asset.assetId);
  const { upNext, recommendations } = pnc || {};
  const [continueWatching] = useContinueWatching(asset.assetId);
  const seasonCarousels = useMemo(() => {
    return asset.seasons?.map(s => WLCarouselHelpers.getResolvedCarouselComponentFromSeason(s, language));
  }, [asset, language]);
  return (
    <>
      <div className="asset-display">
        <div className="asset-display-meta">
          <h1>{getTitleFromAsset(asset, language)}</h1>
          <p>{AssetHelpers.getLongDescription(asset, language)}</p>
          <FavoriteButton assetId={asset.assetId} />
          <h4>{`Bookmark percentage: ${bookmarkPercentage}`}</h4>
          <Entitlements asset={asset} />
          <JsonBox json={JSON.stringify({ continueWatching }, null, 2)} title="Continue Watching asset" />
          <JsonBox json={JSON.stringify({ upNext, recommendations }, null, 2)} title="PNC Data" />
          {AssetHelpers.getAllTagIds(asset).map(id => {
            return (
              <Link to={`/tag/${id}`} key={id}>
                <button>{id}</button>
              </Link>
            );
          })}
        </div>
        <div className="asset-display-img-section">
          <img
            src={AssetHelpers.getScaledImage({
              width: 800,
              imageType: "cover",
              locale: language,
              orientation: "LANDSCAPE",
              asset
            })}
          ></img>
        </div>
      </div>
      {asset?.assetId && asset?.type === AssetType.TV_CHANNEL && <ChannelPicker selectedChannel={asset.assetId} />}
      {seasonCarousels?.map(s => (
        <CarouselComponent key={s.component.id} {...s} />
      ))}
    </>
  );
};
