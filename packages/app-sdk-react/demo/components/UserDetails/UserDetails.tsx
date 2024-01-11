import React from "react";
import { useUserDetails } from "../../../src";
import { ChangePassword } from "../ChangePassword/ChangePassword";
import { ChangeEmail, ChangeEmailSSO } from "../ChangeEmail/ChangeEmail";

export default function UserDetails() {
  const [userDetails] = useUserDetails();

  return (
    <div>
      <h3>{userDetails?.displayName || userDetails?.username}</h3>
      <ChangePassword />
      <ChangeEmail />
      <ChangeEmailSSO />
    </div>
  );
}
