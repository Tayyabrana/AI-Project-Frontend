import moment from "moment";
import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import clientService from "../api/services/clientService";
import projectService from "../api/services/projectService";

import Loading from "../components/Loading";
import { IoMdClose } from "react-icons/io";

const ProjectsModal = ({ edit = false, isOpen, onClose }) => {

  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    project_name: "",
    client_id: "",
    tech_stack: "",
    link: "",
    description: "",
    documentation: "",
    estimated_end_time: "",
  });
  const [errors, setErrors] = useState({
    project_name: false,
    client_id: false,
    tech_stack: false,
    link: false,
    description: false,
    documentation: false,
    estimated_end_time: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await clientService.fetchAll();
        setClients(response.clients);
      } catch (e) { }
    };
    getClients();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        project_name: "",
        client_id: "",
        tech_stack: "",
        link: "",
        description: "",
        documentation: "",
        estimated_end_time: "",
      });
      setErrors({
        project_name: false,
        client_id: false,
        tech_stack: false,
        link: false,
        description: false,
        documentation: false,
        estimated_end_time: false,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        setLoading(true);
        projectService.single(params.get("id")).then((res) => {
          setLoading(false);
          setData(res.project);
        });
      }
    }
  }, []);

  const handleChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
    if (e.target.value.length > 0) {
      setErrors((prevState) => ({ ...prevState, [e.target.name]: false }));
    }
  };

  const submit = () => {
    let hasError = false;
    Object.keys(data).map((v) => {
      if (data[v]?.length === 0) {
        console.log(v);
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });
    console.log(data)
    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (edit) {
        projectService.update(data).then((res) => {
          navigate("/projects");
        });
      } else {
        projectService.create(data).then((res) => {
          
          toast.success('Project added successfully')
          onClose()
          navigate("/projects");
        });
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[60%] mx-auto bg-white rounded-xl px-12 pt-10 pb-8 flex flex-col my-5">
          <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300" onClick={onClose} />
          <h1 className="text-center md:text-center lg:text-center text-[25px] font-[800] uppercase">
            Add Project
          </h1>
          <hr className=" mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mb-1">
            <div className="col-span-3">
              <label className="text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                Project Name
              </label>
              <input
                type="text"
                name="project_name"
                onChange={(e) => handleChange(e)}
                value={data.project_name}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] ${errors["project_name"]
                  ? "border-red-600"
                  : "border-gray-300"
                  } appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Enter Project Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mb-1">
            <div>
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Client
              </label>
              <select
                value={data.client_id}
                name="client_id"
                onChange={(e) => handleChange(e)}
                className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${errors["client_id"] ? "border-red-600" : "border-gray-300"
                  }`}
                id="grid-state"
              >
                <option value="" disabled>
                  Select Client
                </option>
                {clients.map((v) => (
                  <option value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Tech Stack
              </label>
              <input
                type="text"
                name="tech_stack"
                onChange={(e) => handleChange(e)}
                value={data.tech_stack}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] ${errors["tech_stack"] ? "border-red-600" : "border-gray-300"
                  } appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Enter Tech Stack"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mb-1">
            <div className="col-span-2">
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Link
              </label>
              <input
                type="text"
                name="link"
                onChange={(e) => handleChange(e)}
                value={data.link}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]
                                ${errors["link"]
                    ? "border-red-600"
                    : "border-gray-300"
                  } border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Project Link Here"
              />
            </div>
            <div>
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Documentation
              </label>
              <input
                type="text"
                name="documentation"
                onChange={(e) => handleChange(e)}
                value={data.documentation}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] ${errors["documentation"]
                  ? "border-red-600"
                  : "border-gray-300"
                  } border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Documentation Link Here"
              />
            </div>
          </div>
          <div className=" mt-[-1.2rem] mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mb-1">
            <div>
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Estimated Time
              </label>
              <input
                type="date"
                name="estimated_end_time"
                onChange={(e) => handleChange(e)}
                value={moment(data.estimated_end_time).format("YYYY-MM-DD")}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] ${errors["estimated_end_time"]
                  ? "border-red-600"
                  : "border-gray-300"
                  } border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Enter Estimated Time"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 mb-1">
            <div className="col-span-3">
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                onChange={(e) => handleChange(e)}
                value={data.description}
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] ${errors["description"] ? "border-red-600" : "border-gray-300"
                  } border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => submit()}
              className="bg-black hover:font-bold text-white font-[600] py-2 px-[3rem] mt-4 rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsModal;
