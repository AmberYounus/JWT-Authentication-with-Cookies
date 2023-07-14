import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import privateRoutes from "./routes/private.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.dbConnect);
    console.log("connected to mongo db");
  } catch (err) {
    console.log(err);
  }
};
app.listen(PORT, () => {
  dbConnect();
  console.log("listening at the port " + PORT);
});
