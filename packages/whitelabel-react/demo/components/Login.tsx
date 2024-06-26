import React, { useState } from "react";
import { useTranslations, useUserDetails, useUserSession } from "../../src";
import { useLogin, useLogout } from "../../src/hooks/useLogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const logout = useLogout();
  const [userDetails] = useUserDetails();
  const [translations] = useTranslations();
  const [session] = useUserSession();
  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => (session?.isLoggedIn() ? logout() : login(username, password))}>
        {session?.isLoggedIn() ? translations?.getText("LOG_OUT") : translations?.getText("LOG_IN")}
      </button>
      {session?.isLoggedIn() && <p>{`Logged in as: ${userDetails?.username}`}</p>}
      {session?.isAnonymous && <p>Logged in anonymously</p>}
      {!session && <p>Session is null</p>}
    </div>
  );
};
