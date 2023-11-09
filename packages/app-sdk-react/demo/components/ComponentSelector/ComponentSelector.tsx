import { ResolvedComponent, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import React, { PropsWithChildren } from "react";
import { JsonBox } from "../JsonBox";
import { CarouselComponent } from "../Carousel/Carousel";
import { AssetDisplay } from "../AssetDisplay/AssetDisplay";
import { ImageComponent } from "../ImageComponent/ImageComponent";
import { TextComponent } from "../Text/TextComponent";
import { IframeComponent } from "../IframeComponent/IframeComponent";
import "./component-selector.css";

function ComponentWrapper({ children, ...props }: PropsWithChildren<ResolvedComponent>) {
  return (
    <div className="component-wrapper">
      <h3>ComponentId: {props.component.id}</h3>
      <p>Component type: {props.component.appType}</p>
      <p>Component SubType: {props.component.appSubType}</p>
      <JsonBox title={"Component data"} json={JSON.stringify(props, null, 2)} />
      {children}
    </div>
  );
}

export default function ComponentSelector(props: ResolvedComponent<any>) {
  switch (props.component.appType) {
    case "iframe":
      return (
        <ComponentWrapper {...props}>
          <IframeComponent {...props} />
        </ComponentWrapper>
      );
    case "text":
      return (
        <ComponentWrapper {...props}>
          <TextComponent {...props} />
        </ComponentWrapper>
      );
    case "image":
      return (
        <ComponentWrapper {...props}>
          <ImageComponent {...props} />
        </ComponentWrapper>
      );
    case "asset_display":
      return (
        <ComponentWrapper {...props}>
          <AssetDisplay {...props} />
        </ComponentWrapper>
      );
    case "carousel":
      return (
        <ComponentWrapper {...props}>
          <CarouselComponent {...props} />
        </ComponentWrapper>
      );
    default:
      return <ComponentWrapper {...props}></ComponentWrapper>;
  }
}
