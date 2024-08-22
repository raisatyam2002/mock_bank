import { Request, Response } from "express";
import userModel from "../models/Users";
import { sendEmail } from "../utils/emailservice";
export async function loginController(req: Request, res: Response) {
  const { phoneNumber } = req.body;
  try {
    if (phoneNumber) {
      const user = await userModel.findOne({
        phoneNumber: phoneNumber,
      });

      if (user) {
        const otp = Math.floor(Math.random() * 1000000);
        const newUser = await userModel.updateOne({
          where: {
            phoneNumber: phoneNumber,
          },
          otp: otp,
        });
        console.log(newUser);
        await sendEmail("raisatyam121@gmail.com", String(otp));
        return res.status(200).send({
          user: {
            name: user.name,
            address: user.address,
          },
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
