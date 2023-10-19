import { WLAsset as DeprecatedWLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import React from "react";
import { useParams } from "react-router";
import { FavoriteButton } from "../components/FavoriteButton";
import {
  useAsset,
  useBookmarkPercentage,
  useContinueWatching,
  useEntitlementForAsset,
  usePushNextContentData
} from "../../src";
import { JsonBox } from "../components/JsonBox";
import { PlayButton } from "../components/PlayButton";
import { AssetType as DeprecatedAssetType } from "@ericssonbroadcastservices/exposure-sdk";
import ChannelPicker from "../components/ChannelPicker";

const Entitlements = ({ asset }: { asset: DeprecatedWLAsset }) => {
  const [status] = useEntitlementForAsset({ asset }, {});
  return (
    <>
      <PlayButton entitlementResult={status} />
      <JsonBox title={"Entitlement status"} json={JSON.stringify(status, null, 2)} />
    </>
  );
};

export const AssetPage = () => {
  const { id } = useParams();
  const [asset, isLoading, error] = useAsset(id);
  const [bookmarkPercentage] = useBookmarkPercentage(id);
  const [pnc] = usePushNextContentData(id);
  const { upNext, recommendations } = pnc || {};
  const [continueWatching] = useContinueWatching(id);
  if (isLoading || error || !asset) return null;
  return (
    <div>
      <h1>{asset.title}</h1>
      <FavoriteButton assetId={asset.assetId} />
      <h4>{`Bookmark percentage: ${bookmarkPercentage}`}</h4>
      <Entitlements asset={asset} />
      {asset?.assetId && asset?.type === DeprecatedAssetType.TV_CHANNEL && <ChannelPicker />}
      <JsonBox json={JSON.stringify({ continueWatching }, null, 2)} title="Continue Watching asset" />
      <JsonBox json={JSON.stringify({ upNext, recommendations }, null, 2)} title="PNC Data" />
    </div>
  );
};