import { useEffect, useState } from "react";
import { Layout } from "./Layout";
import axios from "axios";
import CircularIndeterminate from "./Loader";
import { useSearchParams } from "react-router-dom";
import sjcl from "sjcl";
import { useRecoilState } from "recoil";
import { userDetails } from "../store/userDetails";
export const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [getUserDetails, setUserDetails] = useRecoilState(userDetails);
  useEffect(() => {
    const checkAuthorization = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BACKENDROUTE + "/user/checkCookie",
        {
          withCredentials: true,
        }
      );
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
              <input
                className="border-2 p-2 rounded"
                value={getUserDetails.amount}
              ></input>
            </div>
            <div className="flex justify-center mt-4 h-8">
              <button
                className="bg-[#1d86ff] w-40 text-white rounded-sm "
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      import.meta.env.VITE_BACKENDROUTE +
                        "/user/sendUserDetails",
                      {
                        user_identifier: getUserDetails.user_identifier,
                        amount: getUserDetails.amount,
                        token: getUserDetails.token,
                      },
                      {
                        withCredentials: true,
                      }
                    );
                    if (res.data.success) {
                      alert(res.data.message);
                    } else {
                      alert(res.data.message);
                    }
                  } catch (error) {
                    console.log(error);
                    alert("error while sending money");
                  }
                  setUserDetails({
                    user_identifier: "",
                    token: "",
                    amount: 0,
                  });
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
