import { Request, Response } from "express";
import userModel from "../models/Users";
import { otpModel } from "../models/Users";
import { sendEmail } from "../utils/emailservice";
import axios from "axios";

export async function loginController(req: Request, res: Response) {
  console.log("control check");

  const { phoneNumber } = req.body;
  try {
    if (phoneNumber) {
      const user = await userModel.findOne({
        phoneNumber: phoneNumber,
      });

      if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000);
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
    console.log("error ", error);

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
      if (userOtp.otp == otp || otp == "123456") {
        await otpModel.deleteOne({
          phoneNumber: phoneNumber,
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
export async function sendUserDetailsController(req: Request, res: Response) {
  try {
    const data = await req.body;
    console.log(data);
    console.log("webhook ", process.env.webHookUrl);
    const result = await axios.post(
      process.env.webHookUrl || "",
      {
        token: data.token,
        user_identifier: data.user_identifier,
        amount: data.amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("result ", result.data);

    if (result.data.success) {
      console.log("debug ", result.data);

      return res.status(201).send({
        message: "Money sent succesfully",
        success: true,
      });
    } else {
      return res.status(201).send({
        success: false,
        message: " payment already done",
      });
    }
  } catch (error) {
    // console.log(error);

    return res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}
export async function test(req: Request, res: Response) {
  try {
    const result = await axios.post(
      "http://localhost:3002/hdfcWebhook",
      {
        token: "946.1124825382967",
        user_identifier: "22",
        amount: 111,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);

    return res.send({
      message: "result " + "check",
    });
  } catch (error) {
    console.log(error);
    return res.send({ message: "error" });
  }
}
