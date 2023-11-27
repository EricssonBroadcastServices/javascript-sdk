import React from "react";
import { useParams } from "react-router";
import { PageType, useResolvedPage } from "../../src";
import ComponentSelector from "../components/ComponentSelector/ComponentSelector";

export const Page = () => {
  const { id } = useParams();
  const [components, isLoading] = useResolvedPage(id as string, PageType.PAGE);
  if (isLoading || !components) return null;
  return (
    <div>
      {components.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
