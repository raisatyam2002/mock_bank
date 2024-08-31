import { Request, Response } from "express";
import userModel from "../models/Users";
import { otpModel } from "../models/Users";
import { sendEmail } from "../utils/emailservice";

export async function loginController(req: Request, res: Response) {
  const { phoneNumber } = req.body;
  try {
    if (phoneNumber) {
      const user = await userModel.findOne({
        phoneNumber: phoneNumber,
      });

      if (user) {
        const otp = Math.floor(Math.random() * 10000000);
        await sendEmail("raisatyam121@gmail.com", String(otp));
        const userOtp = await otpModel.findOne({
          phoneNumber: phoneNumber,
        });
        if (userOtp) {
          console.log("debug 1");
          return res.status(200).send({
            message: "try again after 3 mins",
            success: false,
          });
        }
        const newOtpEntry = await new otpModel({
          otp: otp,
          phoneNumber: phoneNumber,
        }).save();
        console.log("new otp Entry ", newOtpEntry);
        if (newOtpEntry) {
          return res.status(200).send({
            user: {
              name: user.name,
              address: user.address,
            },
            success: true,
          });
        }
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
export async function otpVerificationController(req: Request, res: Response) {
  try {
    const { otp } = req.body;
    const phoneNumber = req.headers["userPhoneNumber"];

    const userOtp = await otpModel.findOne({
      phoneNumber: phoneNumber,
    });
    if (userOtp && userOtp.otp) {
      if (userOtp.otp == otp) {
        await otpModel.deleteOne({
          phoneNumber: 9876543210,
        });
        return res.status(201).send({
          success: true,
          message: "user verified",
        });
      } else {
        return res.status(201).send({
          success: false,
          message: "wrong otp",
        });
      }
    } else {
      return res.status(201).send({
        success: false,
        message: "otp expired login again",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}
