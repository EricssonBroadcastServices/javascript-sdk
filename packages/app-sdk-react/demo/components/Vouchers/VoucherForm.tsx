import React, { useState } from "react";
import { useProductOfferingsByVoucherCode } from "../../../src/hooks/useProductOfferings";
import { StoreProductOffering } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { ProductOfferingHelpers } from "@ericssonbroadcastservices/app-sdk";
import { useSelectedLanguage, useTranslations, useUserSession } from "../../../src";
import "./voucherform.css";

function Offering(offering: StoreProductOffering) {
  const language = useSelectedLanguage();
  const [translations] = useTranslations();
  return (
    <div>
      <h3>{ProductOfferingHelpers.getTitle(offering, language)}</h3>
      <p>{ProductOfferingHelpers.getPriceWithVATString(offering.offeringPrice, translations)}</p>
    </div>
  );
}

function OfferingsList({ code }: { code: string }) {
  const [offerings] = useProductOfferingsByVoucherCode(code);
  return (
    <div>
      {offerings?.map(o => {
        return <Offering key={o.productOfferingId} {...o} />;
      })}
    </div>
  );
}

export default function VoucherForm() {
  const [code, setCode] = useState("");
  const [userSession] = useUserSession();
  if (!userSession?.isLoggedIn) return;
  return (
    <div className="voucherform">
      <input placeholder="Enter a voucherCode" type="text" onChange={e => setCode(e.target.value as string)} />
      {code && <OfferingsList code={code} />}
    </div>
  );
}
