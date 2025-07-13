import React from "react";

const Page3 = ({ setPage }) => {
  const techOptions = {
    frontend: ["React.js", "Next.js", "Vue.js", "Angular", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "Django", "Laravel"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    cloud: ["AWS", "Google Cloud", "Azure"],
  };
  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">
            Select Tech Stack
          </h1>
          <h6 className="text-gray-300 mt-2">
            Choose technologies or frameworks you plan to use
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">3/6</div>
      </div>
      <div className="mt-6">
        <h6 className="text-gray-300">Frontend</h6>
        <div className="flex flex-row flex-wrap gap-3 mt-2">
          {techOptions.frontend.map((option, index) => (
            <div
              className={`bg-white/5 px-4 py-2 text-gray-300 rounded-full ${
                index === 0
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  : ""
              }`}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-gray-300">Backend</h6>
        <div className="flex flex-row flex-wrap gap-3 mt-2">
          {techOptions.backend.map((option, index) => (
            <div
              className={`bg-white/5 px-4 py-2 text-gray-300 rounded-full ${
                index === 0 || index === 1
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  : ""
              }`}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-gray-300">Database</h6>
        <div className="flex flex-row flex-wrap gap-3 mt-2">
          {techOptions.database.map((option, index) => (
            <div
              className={`bg-white/5 px-4 py-2 text-gray-300 rounded-full ${
                index === 2
                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                  : ""
              }`}
              key={index}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-gray-300">Cloud</h6>
        <div className="flex flex-row flex-wrap gap-3 mt-2">
          {techOptions.cloud.map((option, index) => (
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
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
        <label className="text-left w-full text-white text-lg">
          Other (Please Specify)
        </label>
        <input
          type="text"
          className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-full focus:outline-none"
          placeholder="Please Enter Project Type"
        />
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
