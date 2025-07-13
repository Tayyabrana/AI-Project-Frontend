import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";

const Page7 = ({ setPage }) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const developers = [
    {
      name: "Haseeb",
      stack: "Frontend Developer",
    },
    {
      name: "Areeb",
      stack: "Backend Developer",
    },
    {
      name: "Tayyab",
      stack: "Fullstack Developer",
    },
    {
      name: "Fatima",
      stack: "Mobile App Developer",
    },
    {
      name: "Usama",
      stack: "Backend Developer",
    },
    {
      name: "Zainab",
      stack: "Frontend Developer",
    },
    {
      name: "Ali",
      stack: "DevOps Engineer",
    },
  ];

  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">
            Team Assignment
          </h1>
          <h6 className="text-gray-300 mt-2">
            Assign team members or let AI auto assign
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">7/7</div>
      </div>

      <div className="max-h-[70%] overflow-auto mt-10 w-full">
        <div className="grid grid-cols-3 w-full gap-4">
          {developers.map((option, index) => (
            <div
              key={index}
              onClick={() => toggleSelect(index)}
              className={`cursor-pointer p-4 rounded-lg transition-all duration-200 ${
                selected.includes(index)
                  ? "bg-white text-black"
                  : "bg-white/5 text-white"
              }`}
            >
              <h1 className="text-xl font-medium">{option.name}</h1>
              <p className="text-md text-gray-400">{option.stack}</p>
            </div>
          ))}
        </div>
        <button className="flex flex-row items-center gap-2 px-4 py-2 rounded-md text-black bg-white mt-10">
          <BsStars />
          <p>Auto Assign</p>
        </button>
      </div>

      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setPage(6)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => navigate("/users")}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Page7;
