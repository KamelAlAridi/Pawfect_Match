import petService from "../services/petService.js";

export const addpet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    await petService.uploadPhoto(req, res);
  } catch (err) {
    res.status(500).json({ error: "Internal server error while adding pet" });
  }
};

export const getPets = async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    res.status(200).json(pets);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while fetching pets" });
  }
};

export const getPetById = async (req, res) => {
  try {
    const petId = req.params.id;
    if (!petId) {
      return res.status(400).json({ error: "Pet ID is required" });
    }
    const pet = await petService.getPetById(petId);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while fetching pet by ID" });
  }
};

export const addToFavorites = async (req, res) => {
  try {
    const { petId, userId } = req.body;
    if (!petId || !userId) {
      return res.status(400).json({ error: "Pet ID and User ID are required" });
    }
    const result = await petService.addToFavorites(petId, userId);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while adding to favorites" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const favorites = await petService.getFavoritesByUserId(userId);
    res.status(200).json(favorites);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while fetching favorites" });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { petId, userId } = req.body;
    if (!petId || !userId) {
      return res.status(400).json({ error: "Pet ID and User ID are required" });
    }
    const result = await petService.removeFromFavorites(petId, userId);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while removing from favorites" });
  }
};

export const isPetFavorite = async (req, res) => {
  try {
    const { petId, userId } = req.params;
    if (!petId || !userId) {
      return res.status(400).json({ error: "Pet ID and User ID are required" });
    }
    const isFavorite = await petService.isPetFavorite(petId, userId);
    res.status(200).json({ isFavorite });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while checking favorite status" });
  }
};

export const getPetsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const pets = await petService.getPetsByUserId(userId);
    res.status(200).json(pets);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error while fetching pets by user ID" });
  }
};

export const deletePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    if (!petId) {
      return res.status(400).json({ error: "Pet ID is required" });
    }

    const result = await petService.deletePet(petId);

    if (!result || !result.success) {
      return res.status(500).json({
        error: "Failed to delete pet",
        details: result?.error || "Unknown error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
      deletedId: petId,
    });
  } catch (err) {
    console.error("Error in deletePet controller:", err); // Add logging

    if (err.message === "Pet not found") {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(500).json({
      error: "Internal server error while deleting pet",
      details: err.message, // Add details for debugging
    });
  }
};
