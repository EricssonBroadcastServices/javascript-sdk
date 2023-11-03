import React from "react";
import { useParams } from "react-router";
import { IResolvedComponent, PageType, useResolvedPage } from "../../src";
import { JsonBox } from "../components/JsonBox";

function PagePresentation(props: IResolvedComponent) {
  const bgImage = props.reference.images.find(i => i.tags?.includes("background"))?.url;
  return (
    <div style={{ backgroundImage: bgImage ? `url("${bgImage}")` : undefined }}>
      <h3>{props.component.id}</h3>
      <p>{props.component.type}</p>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <JsonBox title={props.component?.title} json={JSON.stringify(props, null, 2)} />
    </div>
  );
}

export const Page = () => {
  const { id } = useParams();
  const [pages, isLoading] = useResolvedPage(id as string, PageType.PAGE);
  if (isLoading || !pages) return null;
  return (
    <div>
      {pages.map((p, i) => (
        <PagePresentation {...p} key={p.component.id + i} />
      ))}
    </div>
  );
};
