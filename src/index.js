import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { seedPosts } from "./seeds/postSeed.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());

connectDB();

if (process.env.SEED === "true") {
  seedPosts().catch((error) => console.error("Seed error", error));
}

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => res.json({ status: "OK", message: "API funcionando" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});