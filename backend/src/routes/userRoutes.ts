import { Router } from "express";
import userModel from "../models/Users";
import {
  loginController,
  otpVerificationController,
} from "../controller/userControlller";
import { attachCookie, validateCookie } from "../middleware/auth";
const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "hi from user routes",
  });
});
router.post("/login", attachCookie, loginController);
router.post("/otpVerification", validateCookie, otpVerificationController);
export default router;
