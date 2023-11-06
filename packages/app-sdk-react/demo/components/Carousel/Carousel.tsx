import { PropsWithChildren } from "react";
import "./carousel.css";
import React from "react";

export function CarouselWrapper(props: PropsWithChildren) {
  return <div className="carousel">{props.children}</div>;
}
