import React, { useState } from "react";
import { useUserDetails, useUserSession } from "../../src";
import { useLogin, useLogout } from "../../src/hooks/useLogin";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const logout = useLogout();
  const [userDetails] = useUserDetails();
  const [session] = useUserSession();
  return (
    <div>
      <p>{`Logged in as: ${userDetails?.username}`}</p>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => (session?.isLoggedIn() ? logout() : login(username, password))}>
        {session?.isLoggedIn() ? "Log out" : "Login"}
      </button>
    </div>
  );
};
