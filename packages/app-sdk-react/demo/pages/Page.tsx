import React from "react";
import { useParams } from "react-router";
import { useResolvedComponentPage } from "../../src";
import ComponentSelector from "../components/ComponentSelector/ComponentSelector";

export const Page = () => {
  const { id } = useParams();
  const [components, isLoading] = useResolvedComponentPage(id as string);
  if (isLoading || !components) return null;
  return (
    <div>
      {components.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
