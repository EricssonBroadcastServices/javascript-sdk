import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelectedLanguage } from "../../src/index";
import { AssetHelpers } from "@ericssonbroadcastservices/app-sdk";
import { useExpandedSearch } from "../../src/hooks/useSearch";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const [result, isLoading] = useExpandedSearch({ term, schemes: [] });
  const locale = useSelectedLanguage();
  return (
    <div style={{ marginLeft: "10px" }}>
      <input placeholder="Search" onChange={e => setTerm(e.target.value)} />
      {isLoading && <p>Loading</p>}
      {result?.map(a => (
        <Link key={a.assetId} to={`/asset/${a.assetId}`}>
          {AssetHelpers.getTitle(a, locale)}
        </Link>
      ))}
    </div>
  );
}
