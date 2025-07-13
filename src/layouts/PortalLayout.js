import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import AddTeamMembers from "../components/AddTeamMembers";

const PortalLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(true);

  const location = useLocation();

  return (
    <>
      {location.pathname.toLowerCase() === "/login" ? (
        children
      ) : (
        <div className="flex flex-col h-screen">
          <div className="flex flex-1">
            <div className={` transition-all duration-[400ms] bg-[#F5F4FE]`}>
              <Sidebar />
            </div>

            <div className="flex-1 bg-[#1d1d1d] transition-all lg:ml-60 duration-[300ms]">
              <div className="flex h-full">{children}</div>
            </div>

            <div className="h-full min-h-[100vh] hidden xl:block w-60 bg-[#1d1d1d]">
              <AddTeamMembers />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortalLayout;
