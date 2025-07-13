import React, { useState } from "react";

const Page5 = ({ setPage }) => {
  const features = [
    "User Registration / Login",
    "User Profile",
    "Payment Gateway",
    "File Upload",
    "Chat",
    "Payment Gateway",
    "User Registration / Login",
    "User Profile",
    "Payment Gateway",
  ];

  // ✅ State to manage selected features
  const [selected, setSelected] = useState([]);

  // ✅ Toggle selection logic
  const toggleFeature = (feature) => {
    if (selected.includes(feature)) {
      setSelected(selected.filter((item) => item !== feature));
    } else {
      setSelected([...selected, feature]);
    }
  };

  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">
            Feature Selection
          </h1>
          <h6 className="text-gray-300 mt-2">
            PlantrixAI suggests features based on your prompt — click to select
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">5/7</div>
      </div>

      <div className="flex flex-col items-center mt-10 gap-2">
        <label className="text-left w-full text-white text-lg">
          Add custom feature
        </label>
        <input
          type="text"
          className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-full focus:outline-none"
          placeholder="Please Enter Custom Feature"
        />
      </div>

      <div className="mt-6">
        <h6 className="text-gray-300 mb-2">Features</h6>
        <div className="flex flex-row flex-wrap gap-3">
          {features.map((option, index) => (
            <div
              key={index}
              onClick={() => toggleFeature(option)}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                selected.includes(option)
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  : "bg-white/5 text-gray-300"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setPage(4)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => setPage(6)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page5;
