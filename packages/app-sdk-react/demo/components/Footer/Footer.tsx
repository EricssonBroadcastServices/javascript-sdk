import React from "react";
import { DocumentLink, useDocumentLinks } from "../../../src";
import "./footer.css";

function AppDocument(doc: DocumentLink) {
  return (
    <span>
      <a href={doc.webAppUrl}>{doc.title}</a>
      <a href={doc.webAppUrlSimplified}>{doc.title} - Simplified</a>
      <img src={doc.qrCode} />
    </span>
  );
}

export default function Footer() {
  const docs = useDocumentLinks();
  return (
    <div className="footer-container">
      {docs.termsAndConditions && <AppDocument {...docs.termsAndConditions} />}
      {docs.privacyPolicy && <AppDocument {...docs.privacyPolicy} />}
      {docs.cookiePolicy && <AppDocument {...docs.cookiePolicy} />}
    </div>
  );
}
