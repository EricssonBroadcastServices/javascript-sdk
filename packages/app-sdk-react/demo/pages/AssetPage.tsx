import React from "react";
import { useParams } from "react-router";
import { Asset, AssetType } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { getTitleFromAsset } from "@ericssonbroadcastservices/app-sdk";
import { FavoriteButton } from "../components/FavoriteButton";
import {
  useAsset,
  useBookmarkPercentage,
  useContinueWatching,
  useEntitlementForAsset,
  usePushNextContentData,
  useSelectedLanguage
} from "../../src";
import { JsonBox } from "../components/JsonBox";
import { PlayButton } from "../components/PlayButton";
import ChannelPicker from "../components/ChannelPicker/ChannelPicker";

const Entitlements = ({ asset }: { asset: Asset }) => {
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
  const language = useSelectedLanguage();
  const [bookmarkPercentage] = useBookmarkPercentage(id);
  const [pnc] = usePushNextContentData(id);
  const { upNext, recommendations } = pnc || {};
  const [continueWatching] = useContinueWatching(id);
  if (isLoading || error || !asset) return null;
  return (
    <div>
      <h1>{getTitleFromAsset(asset, language)}</h1>
      <FavoriteButton assetId={asset.assetId} />
      <h4>{`Bookmark percentage: ${bookmarkPercentage}`}</h4>
      <Entitlements asset={asset} />
      {asset?.assetId && asset?.type === AssetType.TV_CHANNEL && <ChannelPicker selectedChannel={id as string} />}
      <JsonBox json={JSON.stringify({ continueWatching }, null, 2)} title="Continue Watching asset" />
      <JsonBox json={JSON.stringify({ upNext, recommendations }, null, 2)} title="PNC Data" />
    </div>
  );
};
