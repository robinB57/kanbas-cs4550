import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
      />
      <input
        type={passwordHidden ? "password" : "text"}
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />
      {passwordHidden ? (
        <FaEyeSlash onClick={() => setPasswordHidden(!passwordHidden)} />
      ) : (
        <FaEye onClick={() => setPasswordHidden(!passwordHidden)} />
      )}
      <br />
      <button onClick={signup} className="btn btn-success">
        {" "}
        Signup{" "}
      </button>
    </div>
  );
}
