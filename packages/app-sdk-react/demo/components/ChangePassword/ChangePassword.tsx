import { useState } from "react";
import { useValidatePassword } from "../../../src";
import React from "react";

export function ChangePassword() {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const { valid, message } = useValidatePassword(password, secondPassword);
  return (
    <div>
      <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input
        type="password"
        value={secondPassword}
        placeholder="Repeat password"
        onChange={e => setSecondPassword(e.target.value)}
      />
      {message && <p>{message}</p>}
      <p>{`valid: ${valid}`}</p>
    </div>
  );
}
