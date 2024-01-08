import { Asset } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useFavoritesList } from "../../../src/hooks/useFavorites";
import React from "react";
import { AssetHelpers } from "@ericssonbroadcastservices/app-sdk";
import { useLanguage } from "../../../src";
import { Link } from "react-router-dom";

function Favourite({ asset }: { asset: Asset }) {
  const { language, defaultLanguage } = useLanguage();
  return (
    <div>
      <Link to={`/asset/${asset.assetId}`}>
        <h3>{AssetHelpers.getTitle(asset, language, defaultLanguage)}</h3>
      </Link>
    </div>
  );
}

export default function Favourites() {
  const [favourites] = useFavoritesList();
  return (
    <div>
      {favourites?.map(f => {
        return <Favourite key={f.asset.assetId} asset={f.asset} />;
      })}
    </div>
  );
}
