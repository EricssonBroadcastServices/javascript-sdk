import React, { useState } from "react";
import { useSearch } from "../../src/index";

export default function SearchInput() {
  const [term, setTerm] = useState();
  const [assets] = useSearch(term);
  return (
    <div>
      <input placeholder="Search" onChange={e => setTerm(e.target.value)} />
      {assets?.map(a => (
        <h4 key={a.assetId}>{a.title}</h4>
      ))}
    </div>
  );
}
