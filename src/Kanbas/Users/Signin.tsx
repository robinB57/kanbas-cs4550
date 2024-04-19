import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();

  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      {error && <div>{error}</div>}
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type={passwordHidden ? "password" : "text"}
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      {passwordHidden ? (
        <FaEyeSlash onClick={() => setPasswordHidden(!passwordHidden)} />
      ) : (
        <FaEye onClick={() => setPasswordHidden(!passwordHidden)} />
      )}
      <br />
      <button onClick={signin} className="btn btn-primary">
        {" "}
        Sign In{" "}
      </button>
      <br /> <br />
      <button
        onClick={() => navigate("/Kanbas/Account/Signup")}
        className="btn btn-warning"
      >
        Create an Account
      </button>
    </div>
  );
}
