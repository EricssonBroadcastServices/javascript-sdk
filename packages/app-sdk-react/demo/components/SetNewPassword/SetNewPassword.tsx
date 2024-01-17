import React, { useCallback, useState } from "react";
import { useIsPasswordValid, useSetNewPassword } from "../../../src";

export function SetNewPassword() {
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [setNewPassword] = useSetNewPassword();

  const valid = useIsPasswordValid(password);

  const onSubmit = useCallback(() => {
    if (token && password) {
      setNewPassword({ token, password });
    }
  }, [password, setNewPassword, token]);
  return (
    <div>
      <h3>Set new password with token</h3>
      <input type="text" placeholder="token" onChange={e => setToken(e.target.value)} value={token} />
      <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
      <button onClick={onSubmit} disabled={!valid}>
        Submit
      </button>
    </div>
  );
}
