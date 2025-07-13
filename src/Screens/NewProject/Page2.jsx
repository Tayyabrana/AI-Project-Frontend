import React from "react";

const Page2 = ({ setPage }) => {
  return (
    <div className="relative bg-white/5 p-6 shadow-lg w-[50%] h-[70%] rounded-3xl">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-blue-400 text-3xl font-medium">
            Name and Description
          </h1>
          <h6 className="text-gray-300 mt-2">
            Give your project a clear name and describe what it's about.
          </h6>
        </div>
        <div className="text-3xl font-light text-gray-500">2/7</div>
      </div>
      <div className="flex flex-col items-center mt-10 gap-2">
        <label className="text-left w-full text-white text-lg">
          Project Type
        </label>
        <input
          type="text"
          className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-full focus:outline-none"
          placeholder="Please Enter Project Name"
        />
      </div>
      <div className="flex flex-col items-center mt-4 gap-2">
        <label className="text-left w-full text-white text-lg">
          Description
        </label>
        <textarea
          type="text"
          className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-xl min-h-[200px] max-h-[250px] focus:outline-none"
          placeholder="Please Enter Project Description"
        />
      </div>
      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setPage(1)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => setPage(3)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page2;
