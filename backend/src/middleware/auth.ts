import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function attachCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { phoneNumber } = req.body;
    const token = await jwt.sign(phoneNumber, "secretKey");
    console.log("token ", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    next();
  } catch {
    return res.send({
      success: false,
      message: "Error while log in",
    });
  }
}
export async function validateCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;
    console.log("All Cookies:", req.cookies);

    console.log(token);
    console.log("check token ", token);
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: "Error while log in",
    });
  }
}
