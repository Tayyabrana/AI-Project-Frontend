import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";

const SelectProject = () => {
  const options = [
    "Mobile App",
    "Web App",
    "Desktop App",
    "Backend/API Service",
    "AI Chatbot",
    "Saas Platform",
    "E-commerece Store",
  ];
  const techOptions = {
    frontend: ["React.js", "Next.js", "Vue.js", "Angular", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Django", "Laravel"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    cloud: ["AWS", "Google Cloud", "Azure"],
  };

  const [page, setPage] = useState(1);

  return (
    <div className="w-full flex justify-center items-center">
      {/* First Page */}
      {page === 1 && (
        <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-blue-400 text-3xl font-medium">
                Select Project Type
              </h1>
              <h6 className="text-gray-300 mt-2">
                What kind of project are you planning?
              </h6>
            </div>
            <div className="text-3xl font-light text-gray-500">1/6</div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 mt-[10%]">
            {options.map((option, index) => (
              <div
                className={`bg-white/5 px-4 py-2 text-gray-300 rounded-full ${
                  index === 1
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                    : ""
                }`}
                key={index}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center mt-10 gap-2">
            <label className="text-left w-full text-white text-lg">
              Other (Please Specify)
            </label>
            <input
              type="text"
              className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-full focus:outline-none"
              placeholder="Please Enter Project Type"
            />
          </div>
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => setPage(2)}
              className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Page 2 */}
      {page === 2 && <Page2 setPage={setPage} />}
      {/* Page 3 */}
      {page === 3 && <Page3 setPage={setPage} />}
      {/* Page 4 */}
      {page === 4 && <Page4 setPage={setPage} />}
      {/* Page 5 */}
      {page === 5 && <Page5 setPage={setPage} />}

      {page === 6 && <Page6 setPage={setPage} />}
    </div>
  );
};

export default SelectProject;
