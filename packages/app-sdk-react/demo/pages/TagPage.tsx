import React from "react";
import { useParams } from "react-router";
import ComponentSelector from "../components/ComponentSelector/ComponentSelector";
import { useResolvedTagPage } from "../../src/hooks/usePage";

export const TagPage = () => {
  const { id } = useParams();
  const [components, isLoading] = useResolvedTagPage(id as string);
  if (isLoading || !components) return null;
  return (
    <div>
      {components.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
