import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../src/index";
import { AssetHelpers } from "@ericssonbroadcastservices/app-sdk";
import { useExpandedSearch } from "../../src/hooks/useSearch";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const [result, isLoading] = useExpandedSearch({ term, schemes: [] });
  const language = useLanguage();
  return (
    <div style={{ marginLeft: "10px" }}>
      <input placeholder="Search" onChange={e => setTerm(e.target.value)} />
      {isLoading && <p>Loading</p>}
      {result?.map(a => (
        <li style={{ padding: 2 }} className="SearchList" key={`searchItem-${a.assetId}`}>
          <Link style={{ padding: 2 }} key={a.assetId} to={`/asset/${a.assetId}`}>
            {AssetHelpers.getTitle(a, language)}
          </Link>
        </li>
      ))}
    </div>
  );
}
