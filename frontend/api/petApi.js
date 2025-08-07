import axios from "axios";

export async function addPet({
  name,
  gender,
  type,
  photo,
  phone_num,
  user_id,
}) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("type", type);
  formData.append("gender", gender);
  formData.append("photo", photo);
  formData.append("phone_num", phone_num);
  formData.append("user_id", user_id);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/pets/addpet`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
}

export async function getPets() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pets/getpets`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
}

export async function getPetById(id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pets/getpetbyid/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pet by ID:", error);
    throw error;
  }
}

export async function addToFavorites(petId, userId) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/pets/addtofavorites`,
      { petId, userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding pet to favorites:", error);
    throw error;
  }
}

export async function removeFromFavorites(petId, userId) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/pets/removefromfavorites`,
      { petId, userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing pet from favorites:", error);
    throw error;
  }
}

export async function isPetFavorite(petId, userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pets/isfavorite/${petId}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing pet from favorites:", error);
    throw error;
  }
}

export async function getFavorites(userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pets/getfavorites/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}

export async function getPetsByUserId(userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/pets/getpetsbyuserid/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pets by user ID:", error);
    throw error;
  }
}

export async function deletePet(petId) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/pets/deletepet/${petId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
}
