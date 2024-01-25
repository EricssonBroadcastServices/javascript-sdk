import React, { useCallback, useState } from "react";
import { useIsPasswordValid, useSetNewPassword, useTranslations } from "../../../src";

export function SetNewPassword() {
  const [translations] = useTranslations();
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [setNewPassword, , , error] = useSetNewPassword();

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
      {error && <p style={{ color: "red" }}>{error.getUserErrorMessage(translations)}</p>}
    </div>
  );
}
