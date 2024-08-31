import { useEffect, useState } from "react";
import { Layout } from "./Layout";
import axios from "axios";
import CircularIndeterminate from "./Loader";
import { useSearchParams } from "react-router-dom";
import sjcl from "sjcl";
export const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  console.log("PARAMS", URLSearchParams.get("token"));
  const token = URLSearchParams.get("token");

  const decryptedDataString = decodeURIComponent(token || "").trim();
  console.log("decrypt string ", decryptedDataString);
  const encryptedData2 = JSON.parse(token || "");
  console.log("encyptd data2 ", encryptedData2);

  // Proceed with decryption using sjcl or your preferred method
  // const decryptedData = sjcl.decrypt(
  //   "your-encryption-password",
  //   JSON.stringify(encryptedData2)
  // );
  try {
    const decryptedData = sjcl.decrypt(
      "your-encryption-password",
      JSON.stringify(encryptedData2)
    );
    console.log("decrypted data", decryptedData);
  } catch (error: any) {
    console.error("Decryption failed:", error.message);
  }
  // console.log("decrypted data", decryptedData);

  // alert(token);
  useEffect(() => {
    const checkAuthorization = async () => {
      const res = await axios.get("http://localhost:8000/user/checkCookie", {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsLogin(true);
        console.log("result data ", res.data);
      } else {
        console.log("resl data ", res.data);
      }
    };
    checkAuthorization();
  }, []);
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
              Send Money to Payment App
            </div>
            <div className="flex flex-col gap-4">
              <input className="border-2 p-2 rounded" value={"200"}></input>
            </div>
            <div className="flex justify-center mt-4 h-8">
              <button
                className="bg-[#1d86ff] w-40 text-white rounded-sm "
                onClick={() => {}}
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
