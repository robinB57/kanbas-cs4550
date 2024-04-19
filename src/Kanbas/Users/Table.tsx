import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import {
  BsCheck,
  BsCheck2,
  BsFillCheckCircleFill,
  BsFloppy,
  BsPencil,
  BsPersonPlus,
  BsPlus,
  BsPlusCircleFill,
  BsSave,
  BsSave2,
  BsTrash,
  BsTrash3Fill,
} from "react-icons/bs";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [role, setRole] = useState("");

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const updatedUser = await client.updateUser(user);
      setUser(updatedUser);
      setUsers(
        users.map((u) => (u._id === user._id ? (updateUser as any) : u))
      );
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role}
        className="form-control w-25 float-end"
      >
        <option selected value="">
          All users
        </option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>&nbsp;</th>
          </tr>
          <tr>
            <td>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
              <button onClick={updateUser} className="btn btn-primary me-2">
                <BsFloppy />
              </button>
              <button onClick={createUser} className="btn btn-success me-2">
                <BsPersonPlus />
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(user)}
                  className="btn btn-danger me-2"
                >
                  <BsTrash />
                </button>
                <button
                  onClick={() => selectUser(user)}
                  className="btn btn-warning me-2"
                >
                  <BsPencil />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
