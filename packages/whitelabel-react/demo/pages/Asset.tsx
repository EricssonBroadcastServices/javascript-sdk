import { WLAsset } from "@ericssonbroadcastservices/whitelabel-sdk";
import React from "react";
import { useParams } from "react-router";
import { useAsset, useEntitlementForAsset } from "../../src";
import { FavoriteButton } from "../components/FavoriteButton";
import { JsonBox } from "../components/JsonBox";
import { PlayButton } from "../components/PlayButton";

const Entitlements = ({ asset }: { asset: WLAsset }) => {
  const [status] = useEntitlementForAsset(asset, {});
  return (
    <>
      <PlayButton entitlementResult={status} />
      <JsonBox title={"Entitlement status"} json={JSON.stringify(status, null, 2)} />
    </>
  );
};

export const Asset = () => {
  const { id } = useParams();
  const [asset, isLoading, error] = useAsset(id);
  if (isLoading || error || !asset) return null;
  return (
    <div>
      <h1>{asset.title}</h1>

      <FavoriteButton assetId={asset.assetId} />
      <Entitlements asset={asset} />
    </div>
  );
};
