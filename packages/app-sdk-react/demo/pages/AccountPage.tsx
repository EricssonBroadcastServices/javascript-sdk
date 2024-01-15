import React from "react";
import { useUserSession } from "../../src";
import { redirect } from "react-router-dom";
import VoucherForm from "../components/Vouchers/VoucherForm";
import Favourites from "../components/Favourites/Favorites";
import { PurchaseHistory } from "../components/Purchases/PurchaseHistory";
import "./account-page.css";
import PaymentMethods from "../components/PaymentMethods/PaymentMethods";
import UserDetails from "../components/UserDetails/UserDetails";

export const AccountPage = () => {
  const [session] = useUserSession();
  if (!session?.isLoggedIn) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      <section className="account-page-section">
        <h3>User Details</h3>
        <UserDetails />
      </section>
      <section className="account-page-section">
        <h3>Favourites</h3>
        <Favourites />
      </section>
      <section className="account-page-section">
        <h3>Payment methods</h3>
        <PaymentMethods />
      </section>
      <section className="account-page-section">
        <h3>Redeem Voucher</h3>
        <VoucherForm />
      </section>
      <section className="account-page-section">
        <h3>Purchase history</h3>
        <PurchaseHistory />
      </section>
    </div>
  );
};
