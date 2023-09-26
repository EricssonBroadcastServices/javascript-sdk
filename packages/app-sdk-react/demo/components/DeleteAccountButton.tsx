import React, { useCallback, useState } from "react";
import { useDeleteAccount, useUserSession } from "../../src";

export const DeleteAccountButton = () => {
  const [session] = useUserSession();
  const [deleteAccount] = useDeleteAccount();
  const [password, setPassword] = useState("");

  const onClick = useCallback(() => {
    deleteAccount(password)
      .then(() => {
        console.log("successfully deleted account");
      })
      .catch(err => {
        console.log(err);
      });
  }, [deleteAccount]);

  if (!session?.isLoggedIn()) {
    return null;
  }
  return (
    <div>
      <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={onClick}>Delete account test</button>
    </div>
  );
};
