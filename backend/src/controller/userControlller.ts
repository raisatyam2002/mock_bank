import { Request, Response } from "express";
import userModel from "../models/Users";
export async function loginController(req: Request, res: Response) {
  const { phoneNumber } = req.body;
  try {
    if (phoneNumber) {
      const user = await userModel.findOne({
        phoneNumber: phoneNumber,
      });
      console.log(user);
      if (user) {
        return res.status(200).send({
          user,
          success: true,
        });
      } else {
        return res.status(200).send({
          message: "invalid credentials",
          success: false,
        });
      }
    }

    return res.status(200).send({
      message: "invalid credentials",
      success: false,
    });
  } catch (error) {
    return res.status(400).send({
      error,
      success: false,
    });
  }
}
