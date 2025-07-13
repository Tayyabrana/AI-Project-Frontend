import React from "react";

const Page4 = ({ setPage }) => {
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
        <div className="text-3xl font-light text-gray-500">4/6</div>
      </div>
      <textarea
        type="text"
        className="w-full justify-center bg-white/5 py-2 px-4 text-white rounded-xl min-h-[200px] max-h-[440px] focus:outline-none mt-4"
        placeholder="Write Your Idea"
      />
      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setPage(3)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Back
        </button>
      </div>
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => setPage(5)}
          className="bg-gradient-to-tr from-blue-600 to-blue-300 px-8 py-2 rounded-full text-white hover:bg-gradient-to-br"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page4;
