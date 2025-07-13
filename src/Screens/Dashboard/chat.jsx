import React, { useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <main className="flex justify-center items-center w-full p-10">
      <div className="w-full flex flex-col items-center">
        <h1 className="font-normal text-xl text-white">
          Welcome! Ask about your projects or start a new one...
        </h1>
        <div className="flex flex-row items-center w-[55%] bg-white/5 p-2 rounded-full mt-4">
          <input
            className="w-full py-2 px-4 bg-transparent focus:outline-none text-white"
            placeholder="Ask Plantrix..."
          />
          <button>
            <IoIosArrowRoundUp className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white h-10 w-10 rounded-full" />
          </button>
        </div>
        <button
          onClick={() => navigate("/selectproject")}
          className="bg-gradient-to-tr from-blue-600 to-blue-400 hover:bg-gradient-to-br py-2 px-4 rounded-md mt-10 text-white"
        >
          {" "}
          + Create New Project{" "}
        </button>
      </div>
    </main>
  );
};

export default Chat;
