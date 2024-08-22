import { Router } from "express";
import userModel from "../models/Users";
import { loginController } from "../controller/userControlller";
const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "hi from user routes",
  });
});
router.post("/login", loginController);
export default router;
