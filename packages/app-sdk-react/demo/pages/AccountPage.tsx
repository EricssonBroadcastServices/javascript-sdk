import React from "react";
import { useUserSession } from "../../src";
import { redirect } from "react-router-dom";
import VoucherForm from "../components/Vouchers/VoucherForm";
import Favourites from "../components/Favourites/Favorites";
import { PurchaseHistory } from "../components/Purchases/PurchaseHistory";
import "./account-page.css";
import PaymentMethods from "../components/PaymentMethods/PaymentMethods";
import UserDetails from "../components/UserDetails/UserDetails";
import { DeleteAccountButton } from "../components/DeleteAccountButton";

export const AccountPage = () => {
  const [session] = useUserSession();
  if (!session?.isLoggedIn()) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      <details className="account-page-section">
        <summary>User Details</summary>
        <UserDetails />
      </details>
      <details className="account-page-section">
        <summary>Favourites</summary>
        <Favourites />
      </details>
      <details className="account-page-section">
        <summary>Payment methods</summary>
        <PaymentMethods />
      </details>
      <details className="account-page-section">
        <summary>Redeem Voucher</summary>
        <VoucherForm />
      </details>
      <details className="account-page-section">
        <summary>Purchase history</summary>
        <PurchaseHistory />
      </details>
      <details className="account-page-section">
        <summary>Delete account</summary>
        <DeleteAccountButton />
      </details>
    </div>
  );
};
