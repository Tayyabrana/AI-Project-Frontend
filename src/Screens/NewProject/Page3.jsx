import React, { useState } from "react";

const Page3 = ({ setPage }) => {
  const expectedTags = [
    "Clean Code",
    "Responsive Design",
    "Fast Delivery",
    "User Friendly UI",
    "Cross Platform",
    "Bug Free",
    "Scalable Architecture",
    "Performance Optimized",
    "Documentation Included",
    "Deployment Ready",
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
            What's Expected?
          </h1>
          <h6 className="text-gray-300 mt-2">
            Tell us what you expect this project to do. Describe your idea.
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">3/7</div>
      </div>

      <div className="mt-6">
        <div className="flex flex-row flex-wrap gap-3">
          {expectedTags.map((option, index) => (
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
          onClick={() => setPage(2)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => setPage(4)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page3;
