import React, { forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { RiStackLine } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const Sidebar = forwardRef(({}, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="fixed px-2 lg:px-0 lg:w-60 h-[100vh] max-h-[100vh] bg-[#181818]
              overflow-auto no-scrollbar text-black border-r-2 border-gray-600"
    >
      <div className="flex flex-col mt-10">
        <div
          onClick={() => {
            if (location.pathname !== "/chat") {
              navigate("/chat");
            }
          }}
        >
          <div
            className={`lg:px-5 px-4 py-3 lg:mx-5 text-center
                                     cursor-pointer mb-1 flex items-center
                                         ${
                                           location.pathname.includes("chat")
                                             ? "bg-white/20 text-white rounded-lg"
                                             : "bg-transparent text-white font-[600] hover:text-white hover:bg-white hover:bg-opacity-20 hover:rounded-lg"
                                         }`}
          >
            <div className="lg:mr-3">
              <IoChatboxOutline className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-sm hidden lg:flex">Chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="flex flex-col mt-1">
        <div
          onClick={() => {
            if (location.pathname !== "/projects") {
              navigate("/projects");
            }
          }}
        >
          <div
            className={`lg:px-5 px-4 py-3 lg:mx-5 text-center
                                     cursor-pointer mb-1 flex items-center
                                         ${
                                           location.pathname.includes(
                                             "projects"
                                           )
                                             ? "bg-white/20 text-white rounded-lg"
                                             : "bg-transparent text-white font-[600] hover:text-white hover:bg-white hover:bg-opacity-20 hover:rounded-lg"
                                         }`}
          >
            <div className="lg:mr-3">
              <RiStackLine />
            </div>
            <div>
              <p className="font-medium text-sm hidden lg:flex">Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employees */}
      <div className="flex flex-col mt-1">
        <div
          onClick={() => {
            if (location.pathname !== "/employees") {
              navigate("/employees");
            }
          }}
        >
          <div
            className={`lg:px-5 px-4 py-3 lg:mx-5 text-center
                                     cursor-pointer mb-1 flex items-center
                                         ${
                                           location.pathname.includes(
                                             "employees"
                                           )
                                             ? "bg-white/20 text-white rounded-lg"
                                             : "bg-transparent text-white font-[600] hover:text-white hover:bg-white hover:bg-opacity-20 hover:rounded-lg"
                                         }`}
          >
            <div className="lg:mr-3">
              <GoPeople className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-sm hidden lg:flex">Employees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
