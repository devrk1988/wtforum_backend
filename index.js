import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import forumRoutes from "./routes/forum.js";

dotenv.config();

const app = express();
app.use(express.json()); 


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:8021', 'https://rk-robotics.myshopify.com']
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;

// Mount the proxy route
app.use("/apps/forum", forumRoutes);

app.get("/", (req, res) => {
  res.send("App is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
