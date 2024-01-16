import React, { useState } from "react";
import { useDeleteAccount, useUserSession } from "../../src";

export const DeleteAccountButton = () => {
  const [session] = useUserSession();
  const [deleteAccount] = useDeleteAccount();
  const [password, setPassword] = useState("");
  if (!session?.isLoggedIn()) {
    return null;
  }
  return (
    <div>
      <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={() => deleteAccount(password)}>Delete account test</button>
    </div>
  );
};
