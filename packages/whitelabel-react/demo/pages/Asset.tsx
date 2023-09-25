import React from "react";
import { useParams } from "react-router";
import { FavoriteButton } from "../components/FavoriteButton";
import {
  useAsset,
  useBookmarkPercentage,
  useContinueWatching,
  useEntitlementForAsset,
  useGetTimeLeft,
  useProgramProgress,
  usePushNextContentData
} from "../../src";
import { JsonBox } from "../components/JsonBox";
import { PlayButton } from "../components/PlayButton";
import { AssetType } from "@ericssonbroadcastservices/exposure-sdk";
import ChannelPicker from "../components/ChannelPicker";

export const Asset = () => {
  const { id } = useParams();
  const [asset, isLoading, error] = useAsset(id);
  const [status] = useEntitlementForAsset({ asset: asset || undefined }, {});
  const assetProgress = useProgramProgress({ assetId: id, live: status?.streamInfo.live });
  const [bookmarkPercentage] = useBookmarkPercentage(id);
  const [{ upNext, recommendations }] = usePushNextContentData(id);
  const [continueWatching] = useContinueWatching(id);
  const timeLeft = useGetTimeLeft({ percentageWatched: assetProgress.progress, durationMs: asset?.duration });

  if (isLoading || error || !asset) return null;
  return (
    <div>
      <h1>{asset.title}</h1>
      <FavoriteButton assetId={asset.assetId} />
      <h4>{`Bookmark percentage: ${bookmarkPercentage}`}</h4>
      <h4>{`Time Left: ${timeLeft}`}</h4>
      <h4>{`Progress: ${assetProgress.progress.toFixed(1)}%`}</h4>
      <PlayButton entitlementResult={status} />
      <JsonBox title={"Entitlement status"} json={JSON.stringify(status, null, 2)} />
      {asset?.assetId && asset?.type === AssetType.TV_CHANNEL && <ChannelPicker />}
      {asset && <JsonBox title={"Asset Data"} json={JSON.stringify(asset, null, 2)} />}
      <JsonBox json={JSON.stringify({ continueWatching }, null, 2)} title="Continue Watching asset" />
      <JsonBox json={JSON.stringify({ upNext, recommendations }, null, 2)} title="PNC Data" />
    </div>
  );
};
