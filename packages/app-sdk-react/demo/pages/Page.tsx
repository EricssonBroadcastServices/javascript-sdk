import React from "react";
import { useParams } from "react-router";
import { PageType, useResolvedPage } from "../../src";
import ComponentSelector from "../components/ComponentSelector";

export const Page = () => {
  const { id } = useParams();
  const [pages, isLoading] = useResolvedPage(id as string, PageType.PAGE);
  if (isLoading || !pages) return null;
  return (
    <div>
      {pages.map((p, i) => (
        <ComponentSelector {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
