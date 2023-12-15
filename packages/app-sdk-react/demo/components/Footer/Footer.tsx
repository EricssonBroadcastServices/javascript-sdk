import React from "react";
import {
  DocumentLink,
  useContactInformation,
  useDocumentLinks,
  useFooter,
  useSelectedLanguage,
  useServiceContext
} from "../../../src";
import "./footer.css";
import { IExposureWLMenuItem, WLComponentHelpers } from "@ericssonbroadcastservices/app-sdk";
import { Link } from "react-router-dom";

function AppDocument(doc: DocumentLink) {
  return (
    <span>
      <a href={doc.webAppUrl}>{doc.title}</a>
      <a href={doc.webAppUrlSimplified}>{doc.title} - Simplified</a>
      <img src={doc.qrCode} />
    </span>
  );
}

function FooterMenuItem(item: IExposureWLMenuItem) {
  const selectedLanguage = useSelectedLanguage();
  switch (item.actions.default.verb) {
    case "NavigateToPage":
      return (
        <Link to={`/page/${item.actions.default.componentId}`}>
          {WLComponentHelpers.getTitle(item, selectedLanguage)}
        </Link>
      );
    case "NavigateToDetails":
      return (
        <Link to={`/asset/${item.actions.default.assetId}`}>{WLComponentHelpers.getTitle(item, selectedLanguage)}</Link>
      );
    default:
      return null;
  }
}

function SocialMediaLink(item: IExposureWLMenuItem) {
  const { baseUrl } = useServiceContext();
  switch (item.appSubType) {
    case "twitter":
      return (
        <a href={item.actions.default.url}>
          <img src={`${baseUrl}/api/internal/icons/x.png`} style={{ width: "40px", height: "40px" }} />
        </a>
      );
    default:
      return (
        <a href={item.actions.default.url}>
          <img src={`${baseUrl}/api/internal/icons/${item.appSubType}.png`} style={{ width: "40px", height: "40px" }} />
        </a>
      );
  }
}

export default function Footer() {
  const docs = useDocumentLinks();
  const [footer] = useFooter();
  const contactInformation = useContactInformation();
  return (
    <div className="footer-container">
      <div>
        {docs.termsAndConditions && <AppDocument {...docs.termsAndConditions} />}
        {docs.privacyPolicy && <AppDocument {...docs.privacyPolicy} />}
        {docs.cookiePolicy && <AppDocument {...docs.cookiePolicy} />}
      </div>
      <div style={{ flexDirection: "column", display: "flex" }}>
        {footer?.components.menuItems?.map((mi, i) => {
          return <FooterMenuItem {...mi} key={i} />;
        })}
      </div>
      <div>
        {footer?.components.socialMediaLinks?.map((sml, i) => {
          return <SocialMediaLink {...sml} key={i} />;
        })}
      </div>
      <div>
        <p>{`Phone: ${contactInformation?.phone}`}</p>
        <p>{`Email: ${contactInformation?.email}`}</p>
        <p>{`Website: ${contactInformation?.website}`}</p>
      </div>
    </div>
  );
}
