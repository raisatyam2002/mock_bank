import React from "react";
import { Layout } from "./Layout";
export const OTPSECTION = () => {
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
            ></input>
          </div>
          <div className="flex justify-center mt-4 h-8">
            <button
              className="bg-[#1d86ff] w-40 text-white rounded-sm "
              onClick={() => {
                // alert("hi");
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
