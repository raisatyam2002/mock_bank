import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import CircularIndeterminate from "./Loader";

export const OTPSECTION = () => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  console.log("PARAMS", URLSearchParams.get("token"));
  const token = URLSearchParams.get("token");
  const urlSafeEncryptedData = encodeURIComponent(token || "");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkAuthoriZation = async () => {
      const res = await axios.get("http://localhost:8000/user/checkCookie", {
        withCredentials: true,
      });
      if (res.data.success) {
        // alert("hi");
        setIsLogin(true);
        console.log("result data ", res.data);
      } else {
        console.log("resl data ", res.data);
      }
    };
    checkAuthoriZation();
  }, []);
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/otpVerification",
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          withCredentials: true, // Include cookies with the request
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate(`/dashboard/?token=${urlSafeEncryptedData}`);
      } else {
        if (res.data.message == "wrong otp") {
          alert(res.data.message);
        } else {
          navigate(`/?token=${token}`);
        }
      }
    } catch (error) {
      alert("error while verifying user enter otp again");
      navigate("/");
    } finally {
      setOtp("");
    }
  };
  if (!isLogin) {
    return (
      <Layout>
        <div className="flex justify-center pt-56">
          <CircularIndeterminate></CircularIndeterminate>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <div className="loginForm bg-white p-8 border rounded shadow-lg w-full max-w-md">
            <div className="text-lg font-semibold mb-4">
              ENTER OTP SEND TO REGISTERED NUMBER 7999xxx
            </div>
            <div className="flex flex-col gap-4">
              <input
                className="border-2 p-2 rounded"
                placeholder="Enter 6 digit otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex justify-center mt-4 h-8">
              <button
                className="bg-[#1d86ff] w-40 text-white rounded-sm "
                onClick={async () => {
                  await handleClick();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
