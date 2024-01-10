import React from "react";
import { NavLink } from "react-router-dom";
import { useSelectedLanguage, useTranslations, useUserDetails, useUserSession } from "../../src";
import "./menu.css";
import { useConfig, useMenu } from "../../src/hooks/useConfig";
import {
  IExposureComponent,
  IExposureWLAction,
  IExposureWLMenuItem,
  WLComponentHelpers,
  WLConfig
} from "@ericssonbroadcastservices/app-sdk";
import SearchInput from "./SearchInput";
import { LanguageSelector } from "./LanguageSelector";

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
  return <NavLink to={linkString}>{WLComponentHelpers.getTitle(props as IExposureComponent, locale)}</NavLink>;
}

export function Menu() {
  const [menu] = useMenu();
  const [config] = useConfig();
  const [userSession] = useUserSession();
  const [userDetails] = useUserDetails();
  const [translations] = useTranslations();
  if (!config) return null;
  return (
    <div className="menu-top-container">
      <nav className="menu">
        <NavLink to={`/page/${WLConfig.getHomePageId(config)}`}>{translations?.getText(["APPS", "HOME"])}</NavLink>
        {menu?.components.menuItems?.map((menuItem, i) => (
          <MenuItem {...menuItem} key={menuItem.appType + i} />
        ))}

        <NavLink to={`/login`}>
          {!userSession?.isLoggedIn() ? translations?.getText("LOG_IN") : translations?.getText("LOG_OUT")}
        </NavLink>
        {userSession?.isLoggedIn() && <span>{`Logged In as ${userDetails?.username}`}</span>}
      </nav>
      <div className="menu-second-row">
        <LanguageSelector />
        <SearchInput />
      </div>
    </div>
  );
}
