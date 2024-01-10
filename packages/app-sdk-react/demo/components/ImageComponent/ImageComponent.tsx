import { ResolvedComponent } from "@ericssonbroadcastservices/app-sdk";
import React from "react";
import "./image.css";
import { useImageComponent } from "../../../src";

export const ImageComponent = ({ component }: ResolvedComponent<"image">) => {
  const { title, description, image } = useImageComponent(component, { width: 1000 });
  if (!image) return null;
  return (
    <div className="container">
      <img src={image} />
      <div className="image-meta">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
