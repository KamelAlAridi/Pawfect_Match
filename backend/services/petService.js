import supabase from "../supabaseClient.js";

async function uploadPhoto(req, res) {
  try {
    const { name, gender, type, phone_num, user_id } = req.body;
    const photo = req.file;

    const fileName = `${Date.now()}_${photo.originalname}`;

    const { data, error } = await supabase.storage
      .from("pets")
      .upload(fileName, photo.buffer, {
        contentType: photo.mimetype,
      });

    if (error) throw error;

    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/pets/${fileName}`;

    // Store pet info in database
    const { data: inserted, error: dbError } = await supabase
      .from("pets")
      .insert([{ name, gender, type, photo: url, phone_num, user_id }]);

    if (dbError) throw dbError;

    res.status(200).json({ message: "Pet added successfully", data: inserted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllPets() {
  try {
    const { data, error } = await supabase.from("pets").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error("Error fetching pets: " + error.message);
  }
}

async function getPetById(petId) {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", petId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error("Error fetching pet by ID: " + error.message);
  }
}

async function addToFavorites(petId, userId) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ pet_id: petId, user_id: userId }]);

    if (error) throw error;

    return { message: "Pet added to favorites", data };
  } catch (error) {
    throw new Error("Error adding pet to favorites: " + error.message);
  }
}

async function removeFromFavorites(petId, userId) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .delete()
      .eq("pet_id", petId)
      .eq("user_id", userId);

    if (error) throw error;

    return { message: "Pet removed from favorites", data };
  } catch (error) {
    throw new Error("Error removing pet from favorites: " + error.message);
  }
}

async function getFavoritesByUserId(userId) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("pet_id")
      .eq("user_id", userId);

    if (error) throw error;

    const petIds = data.map((fav) => fav.pet_id);

    const { data: pets, error: petsError } = await supabase
      .from("pets")
      .select("*")
      .in("id", petIds);

    if (petsError) throw petsError;

    return pets;
  } catch (error) {
    throw new Error("Error fetching favorites: " + error.message);
  }
}

async function isPetFavorite(petId, userId) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("pet_id", petId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 means no rows found

    return !!data;
  } catch (error) {
    throw new Error("Error checking if pet is favorite: " + error.message);
  }
}

async function getPetsByUserId(userId) {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error("Error fetching pets by user ID: " + error.message);
  }
}

async function deletePet(petId) {
  try {
    const pet = await getPetById(petId);
    if (!pet) {
      throw new Error("Pet not found");
    }
    if (pet.photo) {
      try {
        const url = new URL(pet.photo);
        const bucketPath = "/storage/v1/object/public/pets/";
        const bucketIndex = url.pathname.indexOf(bucketPath);

        if (bucketIndex === -1) {
          console.warn("Invalid pet photo URL format, skipping image deletion");
        } else {
          const filePath = url.pathname.substring(
            bucketIndex + bucketPath.length
          );

          const { data, error: storageError } = await supabase.storage
            .from("pets")
            .remove([filePath]);

          if (storageError) {
            console.error("Storage deletion error:", storageError);
          }
        }
      } catch (urlError) {
        console.error("Error processing image URL:", urlError);
      }
    }

    const { error: dbError } = await supabase
      .from("pets")
      .delete()
      .eq("id", petId);

    if (dbError) {
      throw new Error("Error deleting pet from database: " + dbError.message);
    }

    return { success: true, deletedId: petId };
  } catch (error) {
    console.error("Error in deletePet service:", error);
    throw error;
  }
}

export default {
  uploadPhoto,
  getAllPets,
  getPetById,
  addToFavorites,
  getFavoritesByUserId,
  removeFromFavorites,
  isPetFavorite,
  getPetsByUserId,
  deletePet,
};
