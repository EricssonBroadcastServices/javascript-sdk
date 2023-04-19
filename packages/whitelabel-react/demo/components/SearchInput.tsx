import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../../src/index";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const [assets, isLoading] = useSearch(term);
  return (
    <div>
      <input placeholder="Search" onChange={e => setTerm(e.target.value)} />
      {isLoading && <p>Loading</p>}
      {assets?.map(a => (
        <Link key={a.assetId} to={`/asset/${a.assetId}`}>
          {a.title}
        </Link>
      ))}
    </div>
  );
}
