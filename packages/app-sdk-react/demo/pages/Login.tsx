import React, { useState, useCallback } from "react";
import { useTranslations, useUserDetails, useUserSession } from "../../src";
import { useLogin, useLogout } from "../../src/hooks/useLogin";
import { SetNewPassword } from "../components/SetNewPassword/SetNewPassword";
import { ConfirmSignup } from "../components/ConfirmSignup/ConfirmSignup";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, , , error] = useLogin();
  const [logout] = useLogout();
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  const [translations] = useTranslations();

  const onClick = useCallback(() => {
    if (session?.isLoggedIn()) return logout({});
    login({ username, password });
  }, [session, logout, login, username, password]);

  console.log(error, error?.message, error?.metadata);
  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={onClick}>{session?.isLoggedIn() ? "Log out" : "Login"}</button>
      {session?.isLoggedIn() && <p>{`Logged in as: ${userDetails?.username}`}</p>}
      {error && <p style={{ color: "red" }}>{error.getUserErrorMessage(translations)}</p>}
      {session?.isAnonymous && <p>Logged in anonymously</p>}
      {!session && <p>Session is null</p>}

      {!session?.isLoggedIn() && <SetNewPassword />}
      {!session?.isLoggedIn() && <ConfirmSignup />}
    </div>
  );
};
