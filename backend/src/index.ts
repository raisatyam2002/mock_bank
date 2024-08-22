import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import cors from "cors";
import userRouter from "./routes/userRoutes";
const app = express();
app.use(cors());
dotenv.config();
connectDb();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send({
    message: "Welcome to server",
  });
});
app.use("/user", userRouter);

app.listen("8000", () => {
  console.log("server is running on PORT 8000");
});
