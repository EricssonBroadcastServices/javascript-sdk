import React, { useCallback, useState } from "react";
import { useConfirmSignup } from "../../../src";

export function ConfirmSignup() {
  const [token, setToken] = useState<string>("");
  const [confirmSignup] = useConfirmSignup();

  const onSubmit = useCallback(() => {
    if (token) {
      confirmSignup({ token });
    }
  }, [confirmSignup, token]);
  return (
    <div>
      <h3>Confirm signup with token</h3>
      <input type="text" placeholder="token" onChange={e => setToken(e.target.value)} value={token} />
      <button onClick={onSubmit} disabled={!token}>
        Submit
      </button>
    </div>
  );
}
