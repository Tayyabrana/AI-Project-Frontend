import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";

const Page6 = ({ setPage }) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const options = [
    {
      label: "Urgent",
      description: "faster delivery, higher resource load",
      value: "urgent",
      color: "text-red-400",
    },
    {
      label: "Flexible",
      description: "balanced timeline, lower cost",
      value: "flexible",
      color: "text-green-400",
    },
  ];

  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">
            Timeline Preference
          </h1>
          <h6 className="text-gray-300 mt-2">
            Do you want this project urgently or let AI optimize timelines?
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">6/6</div>
      </div>

      <div className="flex w-full flex-col mt-10 gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelected(option.value)}
            className={`flex flex-row w-full justify-between items-center px-6 py-2 rounded-full cursor-pointer transition-all
              ${
                selected === option.value
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  : "bg-white/5 text-gray-400"
              }`}
          >
            <p>
              <span className={`${!selected ? option.color : ""}`}>
                {option.label}
              </span>{" "}
              {option.description}
            </p>
            {selected === option.value && <FaCheck />}
          </div>
        ))}
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
