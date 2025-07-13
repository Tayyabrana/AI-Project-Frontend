import React from "react";
import { useNavigate } from "react-router-dom";

const Page6 = ({ setPage }) => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">Page 6</h1>
          <h6 className="text-gray-300 mt-2">Third step of the form</h6>
        </div>
        <div className="text-3xl font-light text-gray-500">3/6</div>
      </div>
      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setPage(5)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => navigate("./users")}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Page6;
