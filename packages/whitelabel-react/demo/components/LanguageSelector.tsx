import React from "react";
import { useConfig } from "../../src";
import { useSetSelectedLanguage, useSelectedLanguage } from "../../src/hooks/useSelectedLanguage";

export function LanguageSelector() {
  const setSelectedLanguage = useSetSelectedLanguage();
  const selectedLanguage = useSelectedLanguage();
  const locales = useConfig()[0]?.systemConfig.displayLocales;
  return (
    <div>
      {locales?.map(l => (
        <button
          style={{ backgroundColor: selectedLanguage === l.code ? "red" : "grey" }}
          key={l.code}
          onClick={() => setSelectedLanguage(l.code)}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}
