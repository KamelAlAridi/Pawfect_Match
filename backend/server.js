import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/pets", petRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(8080, () => {
  console.log(`Server running on http://localhost:8080`);
});
