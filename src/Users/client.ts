import axios from "axios";
import { USERS_API } from "../constants";

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

axios.defaults.withCredentials = true;

export async function signin(credentials: User) {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
}

export async function signup(user: any) {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
}

export async function signout() {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
}

export async function createUser(user: any) {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
}

export async function updateUser(user: any) {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
}

export async function deleteUser(user: any) {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
}

export async function profile() {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
}

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

export async function findUsersByRole(role: string) {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
}

export async function findUserById(id: string) {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
}
