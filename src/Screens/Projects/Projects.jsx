import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../api/services/projectService";
import Loading from "../../components/Loading";
import DeleteModal from "../../components/DeleteModal";
import moment from "moment";
import Pagination from "../../components/Pagination";
import ProjectsModal from "../../Modals/ProjectsModal";
import PageNotFound from "../../components/PageNotFound";
import SelectDropdown from "../../components/SelectDropdown";
import toast from "react-hot-toast";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    const filtered = projects.filter((project) =>
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalItems(filtered.length);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  console.log(currentItems);
  const initiateDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleTriggerChange = () => {
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const response = await projectService.fetchAll();
        setProjects(response.projects);
        setFilteredData(response.projects);
        setTotalItems(response.projects.length);
        setCurrentPage(1);
      } catch (e) {
        console.error(e);
      }
    };
    getProjects();
    setTimeout(() => {
      setLoading(false);
    }, [200]);
  }, [trigger]);

  const handleDelete = () => {
    setDeleting(true);
    projectService.delete(deleteID).then((res) => {
      setDeleting(false);
      toast.success("Project deleted successfully");
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
    <div className={` w-full h-full min-h-[calc(100vh-120px)] shadow-xl`}>
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
            <div className="flex justify-center mt-[3rem] w-[90%] m-auto ">
              <input
                name="search"
                type="search"
                id="search"
                placeholder="Search Here"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-[1px] bg-transparent text-white border-gray-600 px-[1rem] py-2 rounded-xl w-[20rem] mr-auto focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => openModal(currentItems)}
                className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white py-2 px-[1rem] rounded-lg w-[150px] ml-auto cursor-pointer uppercase duration-300 hover:bg-gradient-to-br"
              >
                Add Project
              </button>
              {/* <button onClick={() => navigate("/projects/add")}
                                className="bg-white border-[2px] border-[#FEBE77] text-[#FEBE77] py-2 px-[1rem] rounded-xl w-[150px] font-[700] ml-auto cursor-pointer uppercase hover:bg-[#FEBE77] hover:text-white">
                                Add Project
                            </button> */}
            </div>
            {filteredData.length === 0 ? (
              <PageNotFound />
            ) : (
              <div className="rounded-lg border border-gray-500 w-[90%] mx-auto my-10">
                <table className=" border border-gray-600 rounded-lg overflow-hidden p-5 bg-transparent m-auto">
                  <thead>
                    <tr className="uppercase text-sm leading-normal w-full text-blue-400 ">
                      <th className="py-[2%] border-b-[2px] border-blue-500 rounded-tl-xl text-center text-[13px] w-[7%]">
                        Project
                      </th>
                      <th className="py-[2%] border-b-[2px] border-blue-500 text-center text-[13px] w-[7%]">
                        Client
                      </th>
                      <th className="py-[2%] border-b-[2px] border-blue-500 text-center text-[13px] w-[7%]">
                        Tech Stack
                      </th>
                      <th className="py-[2%] border-b-[2px] border-blue-500 text-center text-[13px] w-[7%]">
                        Start Time
                      </th>
                      <th className="py-[2%] border-b-[2px] border-blue-500 text-center text-[13px] w-[7%]">
                        Est End Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((val, i) => (
                      <tr key={i} className="text-gray-300 text-sm w-full">
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center text-[12px] font-bold">
                          {val.project_name}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center text-[12px]">
                          {val.client_name}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center text-[12px]">
                          {val.tech_stack}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center  text-[12px]">
                          {moment(val.start_time).format("ll")}
                        </td>
                        <td className="py-[2%] w-[2%] border-t-[1px] border-gray-500 text-center  text-[12px]">
                          {moment(val.estimated_end_time).format("ll")}
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
      <ProjectsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default Projects;
