import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../../api/services/employeeService";
import toast from "react-hot-toast";
import { IoIosArrowRoundUp } from "react-icons/io";

const Employees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(items);
  }, [filteredData, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setLoading(true);
        const response = await employeeService.fetchAll();
        setEmployees(response.employees);
        setTotalItems(response.employees.length);
        setLoading(false);
      } catch (e) {}
    };
    getEmployees();
  }, [trigger]);

  useEffect(() => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalItems(filtered.length);
    setCurrentPage(1);
  }, [searchTerm, employees]);

  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleDelete = () => {
    setDeleting(true);
    employeeService.delete(deleteID).then((res) => {
      toast.success("Employee deleted successfully");
      setDeleting(false);
      const remainingItems = totalItems - 1;
      const totalPages = Math.ceil(remainingItems / itemsPerPage);

      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
      setTrigger(!trigger);
    });
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setTrigger(!trigger);
  };

  return (
    // <div className={` w-full h-full min-h-100vh shadow-xl`}>
    //   {loading ? (
    //     <Loading />
    //   ) : (
    //     <div>
    //       <DeleteModal
    //         open={open}
    //         setOpen={setOpen}
    //         deleteFunction={handleDelete}
    //         deleting={deleting}
    //       />
    //       <h1 className="text-center text-primary text-4xl font-[600] uppercase mt-5">
    //         Employees
    //       </h1>
    //       <div className="w-full justify-normal flex flex-col">
    //         <div className="flex justify-center mt-[3rem] w-[90%] m-auto">
    //           <input
    //             name="search"
    //             type="search"
    //             id="search"
    //             placeholder="Search Here"
    //             onChange={(e) => setSearchTerm(e.target.value)}
    //             className="border-[1px] border-gray-600 px-[1rem] py-2 rounded-xl w-[20rem] mr-auto focus:outline-none focus:border-gray-900"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => openModal(currentItems)}
    //             className="bg-primary border-[1px] border-primary text-white py-2 px-[1rem] rounded-lg w-[150px] font-[700] ml-auto cursor-pointer uppercase duration-300 hover:bg-white hover:text-primary"
    //           >
    //             Add Employee
    //           </button>
    //         </div>
    //         {filteredData.length === 0 ? (
    //           <PageNotFound />
    //         ) : (
    //           <div className="rounded-lg border w-[90%] mx-auto my-10">
    //             <table className="border rounded-lg overflow-hidden p-5 bg-white m-auto">
    //               <thead className="border-b border-primary">
    //                 <tr className="uppercase text-sm leading-normal w-full text-primary bg-white">
    //                   <th className="py-[2%] rounded-tl-xl w-[2%] border-b-2 border-primary">
    //                     Id
    //                   </th>
    //                   <th className="py-[2%] w-[4%] border-b-2 border-primary">
    //                     Name
    //                   </th>
    //                   <th className="py-[2%] w-[4%] border-b-2 border-primary">
    //                     Phone
    //                   </th>
    //                   <th className="py-[2%] w-[4%] border-b-2 border-primary">
    //                     Designation
    //                   </th>
    //                   <th className="py-[2%] rounded-tr-xl w-[3%] border-b-2 border-primary">
    //                     Actions
    //                   </th>
    //                 </tr>
    //               </thead>

    //               <tbody>
    //                 {currentItems?.map((val, i) => (
    //                   <tr key={i} className="text-black text-sm w-full">
    //                     <td className="py-[2%] w-[2%] border-t-[1px] text-center text-[12px]">
    //                       {(currentPage - 1) * 10 + (i + 1)}
    //                     </td>
    //                     <td className="py-[2%] w-[2%] border-t-[1px] text-center font-bold text-[12px]">
    //                       {val.name}
    //                     </td>
    //                     <td className="py-[2%] w-[2%] border-t-[1px] text-center  text-[12px]">
    //                       {val.phone}
    //                     </td>
    //                     <td className="py-[2%] w-[2%] border-t-[1px] text-center  text-[12px]">
    //                       {val.designation}
    //                     </td>
    //                     <td className="py-[2%] w-[2%] border-t-[1px]">
    //                       <div className="flex items-center justify-center">
    //                         <div
    //                           className="w-4 mr-2 cursor-pointer hover:scale-125"
    //                           onClick={() =>
    //                             navigate("/employees/edit?id=" + val.id)
    //                           }
    //                         >
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             fill="none"
    //                             viewBox="0 0 24 24"
    //                             stroke="blue"
    //                           >
    //                             <path
    //                               strokeLinecap="round"
    //                               strokeLinejoin="round"
    //                               strokeWidth="2"
    //                               d="M15.232 5.232l3.536
    //                                                      3.536m-2.036-5.036a2.5 2.5 0 113.536
    //                                                       3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    //                             />
    //                           </svg>
    //                         </div>
    //                         <div
    //                           className="w-4 ml-2 cursor-pointer hover:scale-125"
    //                           onClick={() => initiateDelete(val.id)}
    //                         >
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             fill="none"
    //                             viewBox="0 0 24 24"
    //                             stroke="red"
    //                           >
    //                             <path
    //                               strokeLinecap="round"
    //                               strokeLinejoin="round"
    //                               strokeWidth="2"
    //                               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    //                             />
    //                           </svg>
    //                         </div>
    //                       </div>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         )}
    //         {filteredData.length === 0 ? (
    //           ""
    //         ) : (
    //           <Pagination
    //             currentPage={currentPage}
    //             totalItems={totalItems}
    //             itemsPerPage={itemsPerPage}
    //             onPageChange={handlePageChange}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   )}
    //   <EmployeesModal
    //     isOpen={isModalOpen}
    //     onClose={closeModal}
    //     order={selectedOrder}
    //     trigger={trigger}
    //     setTrigger={setTrigger}
    //   />
    // </div>
    <main className="flex justify-center items-center w-full p-10">
      <div className="w-full flex flex-col items-center">
        <h1 className="font-normal text-xl text-white">
          Welcome! Ask about your projects or start a new one...
        </h1>
        <div className="flex flex-row items-center w-[55%] bg-white/5 p-2 rounded-full mt-4">
          <input
            className="w-full py-2 px-4 bg-transparent focus:outline-none text-white"
            placeholder="Ask Plantrix..."
          />
          <button>
            <IoIosArrowRoundUp className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white h-10 w-10 rounded-full" />
          </button>
        </div>
        <button
          onClick={() => navigate("/selectproject")}
          className="bg-gradient-to-tr from-blue-600 to-blue-400 hover:bg-gradient-to-br py-2 px-4 rounded-md mt-10 text-white"
        >
          {" "}
          + Create New Project{" "}
        </button>
      </div>
    </main>
  );
};

export default Employees;
