import React, { Fragment, useState } from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { Popover, Transition } from "@headlessui/react";
import { CiUser } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { GrProjects } from "react-icons/gr";

const Topbar = ({ showNav, setShowNav }) => {
    const [openMenu, setOpenMenu] = useState(false)
    

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={`w-full h-20 flex bg-[#F5F4FE]  justify-between items-center transition-all duration-[400ms] `}>

            {/* <div className='pl-4 md:pl-32'>
                <HiMenuAlt2 className='h-8 w-10 max-md:h-[20px] max-md:w-[20px] text-gray-700 cursor-pointer' onClick={() => setShowNav(!showNav)} />
            </div> */}
            <div className=" text-black flex flex-row font-bold items-center  justify-center  py-3 px-3 lg:ml-6 ml-1" >

                <div className="mr-2">
                    <GrProjects className="h-4 w-4 text-[#FF2D38]" />
                </div>
                <div>
                    <p className="text-xl text-[#FF2D38] font-bold">Project Management System</p>
                </div>
            </div>
            {/*<div className="text-[1.5rem] font-[600] font-bold ">WORKERS</div>*/}

            <div className={`transition-all duration-[400ms] ${showNav ? '' : "pr-16 max-sm:pr-[14rem]"}`}>
                <Popover className="relative">
                    <Popover.Button onClick={() => setOpenMenu(!openMenu)} className="flex gap-2 outline-none mr-1 md:mr-8 cursor-pointer text-gray-700">
                        <CiUser className='h-10 w-10 border-2 rounded-full border-gray-600 p-2 mt-[6px] hover:bg-black hover:text-white hover:font-extrabold hover:border-white' />
                    </Popover.Button>
                    <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform scale-95' enterTo='transform scale-100' leave='transition ease-in duration-75' leaveFrom='transform scale-100' leaveTo='transform scale-95'>
                        <Popover.Panel className="mr-20 md:mr-10 absolute -right-8 max-sm:right-0 z-50 mt-4 bg-white border-2 border-[#FEBE77] shadow-gray-400 shadow-lg rounded-md max-w-xs max-sm:wi-[230px] w-[200px] py-1">
                            <div>
                                <>
                                    <center className="mt-5">
                                        {/* <div className="text-[14px] font-[400]">Bilal</div>
                                        <div className="text-[12px] font-[600]">mbm@gmail.com</div> */}
                                        <button onClick={() => { }} className="mt-5 text-center justify-center w-[50%] rounded bg-red-600 text-white font-[600] py-1 mb-5 shadow-md text-[0.8rem] hover:bg-red-700 hover:text-white">
                                            Logout
                                        </button>
                                    </center>
                                </>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>

            </div>
        </div>
    )
}

export default Topbar
