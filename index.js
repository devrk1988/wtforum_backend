// Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import forumRoutes from "./app/routes/forum.routes.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS Configuration
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:8021", "https://rk-robotics.myshopify.com"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log('ssss');
  res.send("App is running.");
});

// Mount forum routes
forumRoutes(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});