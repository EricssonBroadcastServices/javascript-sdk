import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch, useSelectedLanguage } from "../../src/index";
import { AssetHelpers } from "@ericssonbroadcastservices/app-sdk";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const [result, isLoading] = useSearch(term);
  const locale = useSelectedLanguage();
  return (
    <div>
      <input placeholder="Search" onChange={e => setTerm(e.target.value)} />
      {isLoading && <p>Loading</p>}
      {result?.items?.map(a => (
        <Link key={a.asset.assetId} to={`/asset/${a.asset.assetId}`}>
          {AssetHelpers.getTitle(a.asset, locale)}
        </Link>
      ))}
    </div>
  );
}
