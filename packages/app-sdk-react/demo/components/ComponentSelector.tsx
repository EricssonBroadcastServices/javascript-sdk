import { ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import { JsonBox } from "./JsonBox";
import { CarouselComponent } from "./Carousel/Carousel";

// TODO: how to handle generic
function PagePresentation(props: ResolvedComponent<any>) {
  const bgImage = props.presentationParameters.backgroundImage?.url;
  return (
    <div style={{ backgroundImage: bgImage ? `url("${bgImage}")` : undefined }}>
      <h3>{props.component.id}</h3>
      <p>{props.component.appType}</p>
      <p>{props.component.appSubType}</p>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <JsonBox title={props.component?.title} json={JSON.stringify(props, null, 2)} />
    </div>
  );
}

export default function ComponentSelector(props: ResolvedComponent<any>) {
  switch (props.component.appType) {
    case "carousel":
      return <CarouselComponent {...props} />;
    default:
      return <PagePresentation {...props} />;
  }
}
