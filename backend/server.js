import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import registerRoutes from "./routes/registerRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";

const app = express();

configDotenv();

app.use(cors());
app.use(express.json());

app.use("/user", registerRoutes);
app.use("/recipes", recipesRoutes);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    console.log("Mongo is live");
    app.listen(5001, () => console.log(`Server is running at port 5001`));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
})();
