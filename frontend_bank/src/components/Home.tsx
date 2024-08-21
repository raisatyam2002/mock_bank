import React from "react";
import { Layout } from "./Layout";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <div className="loginForm bg-white p-8 border rounded shadow-lg w-full max-w-md">
          <div className="text-lg font-semibold mb-4">Login to NetBanking</div>
          <div className="flex flex-col gap-4">
            <div>Customer ID/ User ID</div>
            <input className="border-2 p-2 rounded"></input>
          </div>
          <div className="flex justify-center mt-4 h-8">
            <button
              className="bg-[#1d86ff] w-40 text-white rounded-sm "
              onClick={() => {
                navigate("/dashboard");
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
