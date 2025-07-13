import React, { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { PiMicrosoftTeamsLogoThin } from "react-icons/pi";
import { BsBoxArrowInUp } from "react-icons/bs";
import { PiBriefcaseThin } from "react-icons/pi";
import { PiBugThin } from "react-icons/pi";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = forwardRef(({}, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="fixed px-2 lg:px-0 lg:w-60 h-[100vh] max-h-[100vh] bg-[#181818]
              overflow-auto no-scrollbar text-black border-r-2 border-gray-600"
    >
      <div className="flex lg:flex-col mt-10">
        <div
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        >
          <div
            className={`lg:px-5 px-4 py-3 lg:mx-5 text-center
                            cursor-pointer mb-1 flex items-center
                            ${
                              location.pathname == "/"
                                ? "bg-white text-black rounded-full"
                                : "bg-transparent text-white font-[600] hover:text-white hover:bg-white hover:bg-opacity-20 hover:rounded-full"
                            }`}
          >
            <div className="lg:mr-3">
              <MdOutlineDashboard className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-sm hidden lg:flex">Dashboard</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <div
          onClick={() => {
            if (location.pathname !== "/users") {
              navigate("/users");
            }
          }}
        >
          <div
            className={`lg:px-5 px-4 py-3 lg:mx-5 text-center
                                     cursor-pointer mb-1 flex items-center
                                         ${
                                           location.pathname.includes("users")
                                             ? "bg-white text-black rounded-full"
                                             : "bg-transparent text-white font-[600] hover:text-white hover:bg-white hover:bg-opacity-20 hover:rounded-full"
                                         }`}
          >
            <div className="lg:mr-3">
              <CiUser className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-sm hidden lg:flex">Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
