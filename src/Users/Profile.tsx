import * as client from "./client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();

  async function fetchProfile() {
    const account = await client.profile();
    setProfile(account);
  }

  async function save() {
    await client.updateUser(profile);
  }

  async function signout() {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <br />
      <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100">
        Users
      </Link>
      {profile && (
        <div className="form-group">
          <input
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            className="form-control"
          />
          <input
            type={passwordHidden ? "password" : "text"}
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            className="form-control"
          />
          {passwordHidden ? (
            <FaEyeSlash onClick={() => setPasswordHidden(!passwordHidden)} />
          ) : (
            <FaEye onClick={() => setPasswordHidden(!passwordHidden)} />
          )}
          <input
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            className="form-control"
          />
          <input
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            className="form-control"
          />
          <input
            value={profile.dob}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            className="form-control"
          />
          <input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="form-control"
          />
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={save} className="btn btn-primary w-100">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger w-100">
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
