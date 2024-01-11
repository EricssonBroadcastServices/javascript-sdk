import { useState, useCallback } from "react";
import { useValidatePasswords } from "../../../src";
import React from "react";
import { useChangePassword } from "../../../src/hooks/useUserDetails";

export function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // we only want to validate the newPassword in this case
  const { valid, message } = useValidatePasswords(newPassword, newPassword);

  const changePassword = useChangePassword();

  const onSubmit = useCallback(() => {
    if (!valid) return;
    return changePassword({ newPassword, currentPassword: password });
  }, [valid, password, newPassword]);

  return (
    <div>
      <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input
        type="password"
        value={newPassword}
        placeholder="Repeat password"
        onChange={e => setNewPassword(e.target.value)}
      />
      <button disabled={!valid} type="button" onClick={onSubmit}>
        Submit
      </button>
      {message && <p>{message}</p>}
      <p>{`valid: ${valid}`}</p>
    </div>
  );
}
