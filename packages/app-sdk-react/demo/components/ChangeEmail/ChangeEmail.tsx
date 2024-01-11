import React, { useCallback, useState } from "react";
import { useChangeEmail, useChangeEmailSSO, useUserDetails } from "../../../src/hooks/useUserDetails";

export function ChangeEmail() {
  const [userDetails] = useUserDetails();
  const changeEmailAddress = useChangeEmail();
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const onSubmit = useCallback(() => {
    return changeEmailAddress({ email: newEmail, password: password });
  }, [password, newEmail]);

  return (
    <div>
      <h4>Change email with password</h4>
      <p>Current email: {userDetails?.email}</p>
      <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="email" value={newEmail} placeholder="new Email" onChange={e => setNewEmail(e.target.value)} />
      <button disabled={false} type="button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export function ChangeEmailSSO() {
  const [userDetails] = useUserDetails();
  const changeEmailAddress = useChangeEmailSSO();
  const [newEmail, setNewEmail] = useState("");

  const onSubmit = useCallback(() => {
    return changeEmailAddress({ email: newEmail });
  }, [newEmail]);

  return (
    <div>
      <h4>
        Change email with password. Used for selected custom SSO customers. Can be tested with an AccessPolicyAccount
      </h4>
      <p>Current email: {userDetails?.email}</p>
      <input type="email" value={newEmail} placeholder="new Email" onChange={e => setNewEmail(e.target.value)} />
      <button disabled={false} type="button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
