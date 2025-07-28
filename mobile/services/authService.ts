import { API_URL } from "@/constants";
import axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.log("Error while Login frontend.", error);
    const msg = error?.response?.data?.message || "Login Failed";
    throw new Error(msg);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
  avatar?: string | null
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      name,
      avatar,
    });

    return response.data;
  } catch (error: any) {
    console.log("Error while Register frontend.", error);
    const msg = error?.response?.data?.message || "Register Failed";
    throw new Error(msg);
  }
};
