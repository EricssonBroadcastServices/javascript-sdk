import React from "react";
import { useUserDetails, useUserSession } from "../../src";
import { redirect } from "react-router-dom";
import { ChangePassword } from "../components/ChangePassword/ChangePassword";

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
    </div>
  );
};
