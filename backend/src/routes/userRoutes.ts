import { Router, Request, Response } from "express";
import userModel from "../models/Users";
import {
  loginController,
  otpVerificationController,
  sendUserDetailsController,
  test,
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
router.get("/checkCookie", validateCookie, (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "validated",
  });
});
router.post("/sendUserDetails", validateCookie, sendUserDetailsController);
router.get("/webHook", test);
export default router;
