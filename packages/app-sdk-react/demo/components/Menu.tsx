import { WLMenuItem } from "@ericssonbroadcastservices/whitelabel-sdk";
import React from "react";
import { Link } from "react-router-dom";
import { useConfig } from "../../src";
import "./menu.css";

function MenuItem(props: WLMenuItem) {
  return <Link to={props.getLink()}>{props.title}</Link>;
}

export function Menu() {
  const [config] = useConfig();
  return (
    <nav className="menu">
      {config?.menu.map(menuItem => (
        <MenuItem {...menuItem} key={menuItem.getLink()} />
      ))}
    </nav>
  );
}
