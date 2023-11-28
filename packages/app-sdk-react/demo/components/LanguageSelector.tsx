import React from "react";
import { useSetSelectedLanguage, useSelectedLanguage } from "../../src/hooks/useSelectedLanguage";
import { useAvailableLanguages } from "../../src/hooks/useSystemConfig";

export function LanguageSelector() {
  const setSelectedLanguage = useSetSelectedLanguage();
  const selectedLanguage = useSelectedLanguage();
  const availableLanguages = useAvailableLanguages();
  return (
    <div>
      {availableLanguages.map(l => (
        <button
          style={{ backgroundColor: selectedLanguage === l.code ? "red" : "grey" }}
          key={l.code}
          onClick={() => setSelectedLanguage(l.code)}
        >
          {l.nativeName}
        </button>
      ))}
    </div>
  );
}
