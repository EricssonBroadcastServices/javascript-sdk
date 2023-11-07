import React from "react";
import { Link } from "react-router-dom";
import { useSelectedLanguage } from "../../src";
import "./menu.css";
import { useMenu } from "../../src/hooks/useConfig";
import {
  IExposureComponent,
  IExposureWLAction,
  IExposureWLMenuItem,
  WLComponentHelpers
} from "@ericssonbroadcastservices/app-sdk";

function getLinkString(action: IExposureWLAction) {
  switch (action.verb) {
    case "NavigateToDetails":
      return `/asset/${action.assetId}`;
    case "NavigateToPage":
      return `/page/${action.componentId}`;
    default:
      return null;
  }
}

function MenuItem(props: IExposureWLMenuItem) {
  const locale = useSelectedLanguage();
  if (!props.actions.default) return null;
  const linkString = getLinkString(props.actions.default);
  if (!linkString) return <span>{WLComponentHelpers.getTitle(props as IExposureComponent, locale)}</span>;
  return <Link to={linkString}>{WLComponentHelpers.getTitle(props as IExposureComponent, locale)}</Link>;
}

export function Menu() {
  const [menu] = useMenu();
  return (
    <nav className="menu">
      {menu?.components.menuItems?.map((menuItem, i) => (
        <MenuItem {...menuItem} key={menuItem.appType + i} />
      ))}
    </nav>
  );
}
