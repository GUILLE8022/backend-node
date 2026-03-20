import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUD_NAME?.trim();
const API_KEY = process.env.API_KEY?.trim();
const API_SECRET = process.env.API_SECRET?.trim();

console.log("Cloudinary env", { CLOUD_NAME, API_KEY: API_KEY ? "SET" : "MISSING", API_SECRET: API_SECRET ? "SET" : "MISSING" });
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error("Cloudinary no configurado: verifica CLOUD_NAME/API_KEY/API_SECRET en .env");
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export default cloudinary;