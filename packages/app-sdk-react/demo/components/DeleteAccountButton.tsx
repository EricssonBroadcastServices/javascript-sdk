import React from "react";
import { useDeleteAccount, useUserSession } from "../../src";

export const DeleteAccountButton = () => {
  const [session] = useUserSession();
  const [deleteAccount] = useDeleteAccount();
  if (!session?.isLoggedIn()) {
    return null;
  }
  return (
    <div>
      <button onClick={() => deleteAccount()}>Delete account test</button>
    </div>
  );
};
