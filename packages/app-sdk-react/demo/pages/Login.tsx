import React, { useState, useCallback } from "react";
import { useUserDetails, useUserSession } from "../../src";
import { useLogin, useLogout } from "../../src/hooks/useLogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, , , error] = useLogin();
  const [logout] = useLogout();
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();

  const onClick = useCallback(() => {
    if (session?.isLoggedIn()) return logout({});
    login({ username, password });
  }, [session, logout, login, username, password]);
  console.log(error);
  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={onClick}>{session?.isLoggedIn() ? "Log out" : "Login"}</button>
      {session?.isLoggedIn() && <p>{`Logged in as: ${userDetails?.username}`}</p>}
      {session?.isAnonymous && <p>Logged in anonymously</p>}
      {!session && <p>Session is null</p>}
    </div>
  );
};
