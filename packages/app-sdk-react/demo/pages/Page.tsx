import React from "react";
import { useParams } from "react-router";
import { PageType, useResolvedPage } from "../../src";
import { JsonBox } from "../components/JsonBox";
import { ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";

// TODO: how to handle generic
function PagePresentation(props: ResolvedComponent<any>) {
  const bgImage = props.presentationParameters.backgroundImage?.url;
  return (
    <div style={{ backgroundImage: bgImage ? `url("${bgImage}")` : undefined }}>
      <h3>{props.component.id}</h3>
      <p>{props.component.appType}</p>
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
