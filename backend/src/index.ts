import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
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
