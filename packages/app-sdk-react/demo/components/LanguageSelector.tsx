import React from "react";
import { useSystemConfigV2 } from "../../src";
import { useSetSelectedLanguage, useSelectedLanguage } from "../../src/hooks/useSelectedLanguage";

export function LanguageSelector() {
  const setSelectedLanguage = useSetSelectedLanguage();
  const selectedLanguage = useSelectedLanguage();
  const [systemConfig] = useSystemConfigV2();
  return (
    <div>
      {systemConfig?.localization.displayLocales.map(l => (
        <button
          style={{ backgroundColor: selectedLanguage === l ? "red" : "grey" }}
          key={l}
          onClick={() => setSelectedLanguage(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
