import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import sjcl from "sjcl";
import { userDetails } from "../store/userDetails";
import { useRecoilState } from "recoil";
export const Home = () => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  // console.log("PARAMS", URLSearchParams.get("token"));
  const token = URLSearchParams.get("token");
  const decryptedDataString = decodeURIComponent(token || "");
  // console.log("decrypt string ", decryptedDataString);
  const encryptedData2 = JSON.parse(token || "");
  // console.log("encyptd data2 ", encryptedData2);
  const [getUserDetails, setUserDetails] = useRecoilState(userDetails);

  // Proceed with decryption using sjcl or your preferred method
  // const decryptedData = sjcl.decrypt(
  //   "your-encryption-password",
  //   JSON.stringify(encryptedData2)
  var userData: any;
  // );
  try {
    const decryptedData = sjcl.decrypt(
      "your-encryption-password",
      JSON.stringify(encryptedData2)
    );
    // console.log("decrypted data", decryptedData);
    userData = JSON.parse(decryptedData);
    // console.log("userData ", userData);
  } catch (error: any) {
    console.error("Decryption failed:", error.message);
  }
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<number>();
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        {
          phoneNumber: customerId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data.message);
        navigate(`/paymentConfirmation/?token=${token}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("error internal error");
    } finally {
      setCustomerId(undefined);
    }
  };
  useEffect(() => {
    setUserDetails({
      user_identifier: userData.user_identifier,
      amount: userData.amount,
      token: userData.token,
    });
    console.log("getDetails ", getUserDetails);
  }, []);
  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <div className="loginForm bg-white p-8 border rounded shadow-lg w-full max-w-md">
          <div className="text-lg font-semibold mb-4">Login to NetBanking</div>
          <div className="flex flex-col gap-4">
            <div>Customer ID/ User ID</div>

            <input
              type="number"
              className="border-2 p-2 rounded"
              value={customerId || ""}
              onChange={(e: any) => {
                setCustomerId(e.target.value);
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
              Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
