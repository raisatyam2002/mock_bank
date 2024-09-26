import React, { useEffect, useState } from "react";
import { Layout } from "./Layout";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import sjcl from "sjcl";
import { userDetails } from "../store/userDetails";
import { useRecoilState } from "recoil";
export const Home = () => {
  // alert(import.meta.env.VITE_SOME_KEY);
  console.log("Home component rendered");
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const token = URLSearchParams.get("token");
  let encryptedData2;
  try {
    encryptedData2 = JSON.parse(token || "{}");
  } catch (error) {
    console.error("Error parsing token:", error);
    return; // Exit early if parsing fails
  }

  const [getUserDetails, setUserDetails] = useRecoilState(userDetails);
  let userData;
  try {
    const decryptedData = sjcl.decrypt("your-encryption-password", token || "");
    console.log("dexctypr data ", decryptedData);

    userData = JSON.parse(decryptedData);
  } catch (error: any) {
    console.error("Decryption failed:", error.message);
    return; // Exit early if decryption fails
  }
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<number>();
  const handleClick = async () => {
    alert("click");
    try {
      console.log("ROUTE ", import.meta.env.VITE_BACKENDROUTE);

      const res = await axios.post(
        import.meta.env.VITE_BACKENDROUTE + "/user/login",
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
    if (userData) {
      setUserDetails({
        user_identifier: userData.user_identifier,
        amount: userData.amount,
        token: userData.token,
      });
      console.log("getDetails ", getUserDetails);
    } else {
      console.log("No user data available to set.");
    }
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
