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

export async function signIn(credentials: User) {
  const response = await axios.post(`${USERS_API}/signin`, credentials);
  return response.data;
}

export async function profile() {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
}
