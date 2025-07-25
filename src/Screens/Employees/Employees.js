import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../../api/services/employeeService";
import toast from "react-hot-toast";
import EmployeesModal from "../../Modals/EmployeesModal";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import PageNotFound from "../../components/PageNotFound";
import Pagination from "../../components/Pagination";

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
    <div className={` w-full h-full min-h-100vh shadow-xl`}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <DeleteModal
            open={open}
            setOpen={setOpen}
            deleteFunction={handleDelete}
            deleting={deleting}
          />
          <div className="w-full justify-normal flex flex-col">
            <div className="flex justify-center mt-[3rem] w-[90%] m-auto">
              <input
                name="search"
                type="search"
                id="search"
                placeholder="Search Here"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-[1px] text-white border-gray-600 bg-transparent px-[1rem] py-2 rounded-xl w-[20rem] mr-auto focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => openModal(currentItems)}
                className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white py-2 px-[1rem] rounded-lg w-[150px] ml-auto cursor-pointer uppercase duration-300 hover:bg-gradient-to-br"
              >
                Add Employee
              </button>
            </div>
            {filteredData.length === 0 ? (
              <PageNotFound />
            ) : (
              <div className="rounded-lg border border-gray-500 w-[90%] mx-auto my-10">
                <table className="border border-gray-600 rounded-lg overflow-hidden p-5 bg-transparent m-auto">
                  <thead className="border-b border-blue-400">
                    <tr className="uppercase text-sm leading-normal w-full text-blue-400 bg-transparent">
                      <th className="py-[2%] rounded-tl-xl w-[2%] border-b-2 border-blue-400">
                        Id
                      </th>
                      <th className="py-[2%] w-[4%] border-b-2 border-blue-400">
                        Name
                      </th>
                      <th className="py-[2%] w-[4%] border-b-2 border-blue-400">
                        Phone
                      </th>
                      <th className="py-[2%] w-[4%] border-b-2 border-blue-400">
                        Designation
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems?.map((val, i) => (
                      <tr
                        key={i}
                        className="text-gray-300 text-sm w-full border-gray-500"
                      >
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center text-[12px]">
                          {(currentPage - 1) * 10 + (i + 1)}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center font-bold text-[12px]">
                          {val.name}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center  text-[12px]">
                          {val.phone}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center  text-[12px]">
                          {val.designation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {filteredData.length === 0 ? (
              ""
            ) : (
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
      <EmployeesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </div>
  );
};

export default Employees;
