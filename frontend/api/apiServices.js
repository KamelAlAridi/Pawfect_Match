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

export async function updateName(userId, newName) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/auth/update-name`,
      { userId, newName }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating name:", error);
    throw error;
  }
}

export async function changePassword(email, oldPassword, newPassword) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/auth/update-password`,
      { email, oldPassword, newPassword }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export async function deleteAccount(email, password) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/auth/delete-account`,
      { data: { email, password } }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    if (error.response) {
      const message = error.response.data?.error || "Failed to delete account";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function newPassword(email, password, code) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/auth/changePass`,
      { email, password, code }
    );
    return response.data;
  } catch (error) {
    console.error("Error reseting password:", error);
    throw error;
  }
}
