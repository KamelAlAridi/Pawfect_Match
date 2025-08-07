import axios from "axios";

export async function requestCode(email) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/request-code`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("Error requesting code:", error);
    throw error;
  }
}

export async function signup(email, code, name, password) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
      { email, code, name, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying code:", error);
    throw error;
  }
}

export async function signin(email, password) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signin`,
      { email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function isUserCreated(email) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/isUserCreated`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking user creation:", error);
    throw error;
  }
}
