import React from "react";
import { useDeletePaymentMethod, usePaymentMethods, useSetPreferredPaymentMethod } from "../../../src";
import { CardSummary } from "@ericssonbroadcastservices/rbm-ott-sdk";

function Card(props: CardSummary) {
  return (
    <span>
      {props.brand} {props.last4}
    </span>
  );
}

export default function PaymentMethods() {
  const [paymentMethods] = usePaymentMethods();
  const deletePaymentMethod = useDeletePaymentMethod();
  const setPreferredPaymentMethod = useSetPreferredPaymentMethod();
  return (
    <div className="payment-method-container">
      {paymentMethods?.map(method => {
        return (
          <div key={method.id}>
            {method.cardSummary && <Card {...method.cardSummary} />}
            <p>id: {method.id}</p>
            <p>isPreferred: {method.preferred.toString()}</p>
            <button onClick={() => setPreferredPaymentMethod(method.id)}>Set as preferred</button>
            <button onClick={() => deletePaymentMethod(method.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
