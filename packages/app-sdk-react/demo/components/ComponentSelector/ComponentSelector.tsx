import { ResolvedComponent, WLComponentHelpers, WLComponentType } from "@ericssonbroadcastservices/app-sdk";
import React, { PropsWithChildren } from "react";
import { JsonBox } from "../JsonBox";
import { CarouselComponent } from "../Carousel/Carousel";
import { AssetDisplay } from "../AssetDisplay/AssetDisplay";
import { ImageComponent } from "../ImageComponent/ImageComponent";
import { TextComponent } from "../Text/TextComponent";
import { IframeComponent } from "../IframeComponent/IframeComponent";
import "./component-selector.css";
import { HeroBanner } from "../HeroBanner/HeroBanner";
import { EPGComponent } from "../EPGComponent/EPGComponent";
import { TagTypeComponent } from "../TagTypeComponent/TagTypeComponent";

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

export default function ComponentSelector(props: ResolvedComponent) {
  switch (props.component.appType) {
    case "tagtype":
      return (
        <ComponentWrapper {...props}>
          <TagTypeComponent {...props} />
        </ComponentWrapper>
      );
    case "epg":
      return (
        <ComponentWrapper {...props}>
          <EPGComponent {...props} />
        </ComponentWrapper>
      );
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
    case "herobanner":
      return (
        <ComponentWrapper {...props}>
          <HeroBanner {...props} />
        </ComponentWrapper>
      );
    default:
      return <ComponentWrapper {...props}></ComponentWrapper>;
  }
}
