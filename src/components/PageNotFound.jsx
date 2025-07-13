import React from "react";
import notFound from '../assests/person.png'

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center  mt-20">
      <img src={notFound} alt="" className=" h-24 w-24" />
      <h1 className="text-center font-bold text-5xl text-gray-600">
        Data <span className="text-[#FEBE77]">Not </span>Found
      </h1>
    </div>
  );
};

export default PageNotFound;
