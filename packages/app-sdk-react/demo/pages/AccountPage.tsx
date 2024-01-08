import React from "react";
import { useUserDetails, useUserSession } from "../../src";
import { redirect } from "react-router-dom";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";
import VoucherForm from "../components/Vouchers/VoucherForm";
import Favourites from "../components/Favourites/Favorites";

export const AccountPage = () => {
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  if (!session?.isLoggedIn) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      <h3>{userDetails?.displayName || userDetails?.username}</h3>
      <ChangePassword />
      <Favourites />
      <VoucherForm />
    </div>
  );
};
