import React from "react";

export const JsonBox = ({ json, children, title }: { json: any; children?: any; title: string }) => {
  return (
    <details style={{ flex: 1 }}>
      {children}
      <summary>{title}</summary>
      <p style={{ whiteSpace: "pre-wrap" }}>{json}</p>
    </details>
  );
};
