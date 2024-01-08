import React from "react";
import { useUserDetails, useUserSession } from "../../src";
import { redirect } from "react-router-dom";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";
import VoucherForm from "../components/Vouchers/VoucherForm";
import Favourites from "../components/Favourites/Favorites";
import { PurchaseHistory } from "../components/Purchases/PurchaseHistory";
import "./account-page.css";

export const AccountPage = () => {
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  if (!session?.isLoggedIn) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      <section className="account-page-section">
        <h3>{userDetails?.displayName || userDetails?.username}</h3>
      </section>
      <section className="account-page-section">
        <h3>Change password</h3>
        <ChangePassword />
      </section>
      <section className="account-page-section">
        <h3>Favourites</h3>
        <Favourites />
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
