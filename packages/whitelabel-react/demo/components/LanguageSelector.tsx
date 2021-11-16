import React from "react";
import { useConfig } from "../../src";
import { useSetSelectedLanguage } from "../../src/hooks/useSelectedLanguage";

export function LanguageSelector() {
  const setSelectedLanguage = useSetSelectedLanguage();
  const locales = useConfig()?.systemConfig.locales;
  return (
    <div>
      {locales?.map(l => (
        <button key={l.code} onClick={() => setSelectedLanguage(l.code)}>
          {l.name}
        </button>
      ))}
    </div>
  );
}
