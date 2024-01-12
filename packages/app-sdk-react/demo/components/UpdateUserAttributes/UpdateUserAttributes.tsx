import React, { useState, useCallback } from "react";
import { useLanguage, useUserDetails } from "../../../src";
import { UserAttributeResponse } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { useSetUserAttributes } from "../../../src/hooks/useUserDetails";
import { UserDetailsHelpers } from "@ericssonbroadcastservices/app-sdk";

function getInputType(attribute: UserAttributeResponse) {
  switch (attribute.type) {
    case "integer":
    case "real":
      return "number";
    case "boolean":
      return "checkbox";
    default:
      return "text";
  }
}

function sanitizeInputValue(attribute: UserAttributeResponse, value: any) {
  console.log(attribute.type, value);
  switch (attribute.type) {
    case "integer":
    case "real":
      return parseFloat(value);
    default:
      return value;
  }
}

export default function UpdateUserAttributes() {
  const { defaultLanguage } = useLanguage();
  const [userDetails] = useUserDetails();
  const [changedAttributes, setChangedAttributes] = useState<{ attributeId: string; value: string }[]>([]);
  const [setUserAttributes, , isLoading, error] = useSetUserAttributes();

  const onAttributeChanged = useCallback(
    (attributeId: string, value: string) => {
      userDetails?.attributes.map((a: UserAttributeResponse) => {
        if (a.attributeId === attributeId) {
          setChangedAttributes([
            ...changedAttributes.filter(a => a.attributeId !== attributeId),
            { attributeId, value }
          ]);
        }
      });
    },
    [changedAttributes, userDetails?.attributes]
  );

  const onSave = useCallback(() => {
    if (!changedAttributes.length) return;
    setUserAttributes(changedAttributes);
  }, [changedAttributes, setUserAttributes]);

  return (
    <div>
      <h4>Update user attributes</h4>
      {userDetails?.attributes.map((atr, i) => {
        return (
          <div key={i}>
            <p>{UserDetailsHelpers.getAttributeTitle(atr, defaultLanguage)}</p>
            <div>
              <h5>Enums:</h5>
              {atr.enums?.map(e => (
                <span style={{ marginRight: "10px" }} key={e.id}>
                  {e.id}
                </span>
              ))}
            </div>
            <input
              type={getInputType(atr)}
              placeholder={atr.value?.toString() as any}
              onChange={e => {
                const value = sanitizeInputValue(atr, atr.type === "boolean" ? e.target.checked : e.target.value);
                onAttributeChanged(atr.attributeId, value);
              }}
            />
          </div>
        );
      })}
      {(error as any) && <p>{(error as any).toString()}</p>}
      {isLoading && <p>{isLoading.toString()}</p>}
      <button onClick={onSave} disabled={changedAttributes.length === 0} type="button">
        Save
      </button>
    </div>
  );
}
