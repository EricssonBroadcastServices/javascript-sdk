import React from "react";
import { useParams } from "react-router";
import { useResolvedAssetPage } from "../../src/hooks/usePage";
import ComponentSelector from "../components/ComponentSelector/ComponentSelector";

export const AssetPage = () => {
  const { id } = useParams();
  const [components, isLoading, error] = useResolvedAssetPage(id as string);
  if (isLoading || error || !components) return null;
  return (
    <div>
      {components.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
