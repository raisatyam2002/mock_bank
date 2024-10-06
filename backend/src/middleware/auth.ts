import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export async function attachCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { phoneNumber } = req.body;

    const token = await JWT.sign(phoneNumber, process.env.jwt_secret || "");
    console.log("token ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    next();
  } catch (error: any) {
    console.log("cookie error ", error);

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
    const decode = await JWT.verify(token, "secretKey");
    console.log("check cookie ", decode);

    if (typeof decode == "string") {
      req.headers["userPhoneNumber"] = decode;
      next();
    } else {
      return res.status(200).send({
        success: false,
        message: "check your login Id",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: "Error while log in",
    });
  }
}
