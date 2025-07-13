import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import EmployeesModal from "../Modals/EmployeesModal";

const AddTeamMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center w-full py-10">
      <div className="flex w-full flex-col items-center">
        <h6 className="text-blue-400 font-medium text-lg">Team Members</h6>
        <div className="bg-[#ffffff0c] w-[90%] rounded-lg p-6 mt-4">
          <h6 className="text-gray-400">No Members Yet</h6>
          <button
            onClick={openModal}
            className="flex items-center mt-4 gap-2 w-full rounded-md py-2 px-4 hover:bg-white/10 duration-300"
          >
            <IoMdAdd className="bg-white h-6 w-6 font-bold p-1 rounded-full text-black" />
            <p className="text-gray-300">Add a Member</p>
          </button>
        </div>
      </div>

      {/* Static modal just for open/close */}
      <EmployeesModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddTeamMembers;
