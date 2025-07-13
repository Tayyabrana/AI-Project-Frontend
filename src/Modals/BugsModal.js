import { Textarea } from "@headlessui/react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import bugService from "../api/services/bugService";
import projectService from "../api/services/projectService";
import Loading from "../components/Loading";
import teamService from "../api/services/teamService";
import employeeService from "../api/services/employeeService";
import featureService from "../api/services/featureService";
import uploadService from "../api/services/uploadService";

const BugsModal = ({ edit = false, isOpen, onClose, update, setUpdate }) => {
  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";

  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [features, setFeatures] = useState([]);

  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [data, setData] = useState({
    project_id: "",
    bug_name: "",
    bug_description: "",
    priority: "",
    estimated_time: "",
    team_id: "",
    user_id: "",
    feature_id: "",
  });
  const [errors, setErrors] = useState({
    project_id: false,
    bug_name: false,
    bug_description: false,
    priority: false,
    estimated_time: false,
    team_id: "",
    user_id: "",
    feature_id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.fetchAll();
        setProjects(response.projects);
        setLoading(false);
      } catch (e) {}
    };
    getProjects();
  }, [trigger]);

  useEffect(() => {
    if (data.project_id) {
      setData((prev) => ({
        ...prev,
        team_id: "",
        user_id: "",
        feature_id: "",
      }));
      const getTeams = async () => {
        try {
          const response = await teamService.fetchteamByProject(
            data.project_id
          );
          setTeams(response.teams);
        } catch (e) {}
      };
      getTeams();
      const getFeatures = async () => {
        try {
          const response = await featureService.fetchByProject(data.project_id);
          setFeatures(response.features);
        } catch (e) {}
      };
      getFeatures();
    }
  }, [data.project_id]);

  useEffect(() => {
    if (data.team_id) {
      setData((prev) => ({
        ...prev,
        user_id: "",
      }));
      const getMembers = async () => {
        try {
          const response = await employeeService.fetchByTeam(data.team_id);
          setMembers(response.employees);
        } catch (e) {}
      };
      getMembers();
    }
  }, [data.team_id]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        setLoading(true);
        bugService.single(params.get("id")).then((res) => {
          setLoading(false);
          setData(res.bug);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        project_id: "",
        bug_name: "",
        bug_description: "",
        priority: "",
        estimated_time: "",
        team_id: "",
        user_id: "",
        feature_id: "",
      });
      setErrors({
        project_id: false,
        bug_name: false,
        bug_description: false,
        priority: false,
        estimated_time: false,
        team_id: "",
        user_id: "",
        feature_id: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
    if (e.target.value.length > 0) {
      setErrors((prevState) => ({ ...prevState, [e.target.name]: false }));
    }
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let tempErrors = { ...errors };
        tempErrors.image = false;
        setErrors(tempErrors);
        setData((d) => ({ ...d, image: reader.result }));
      };
    }
  };

  const submit = () => {
    let hasError = false;
    Object.keys(data).map((v) => {
      if (data[v]?.length === 0) {
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });
    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (edit) {
        if (file) {
          uploadService.single(file).then((result) => {
            let bug = { ...data };
            bug.image = result.response.url;
            bugService.update(data).then((res) => {
              setUpdate(!update);
              toast.success("Bug updated successfully");
              navigate("/bugs");
            });
          });
        } else {
          bugService.update(data).then((res) => {
            setUpdate(!update);
            toast.success("Bug updated successfully");
            navigate("/bugs");
          });
        }
      } else {
        if (file) {
          uploadService.single(file).then((result) => {
            let bug = { ...data };
            bug.image = result.response.url;
            bugService.create(bug).then((res) => {
              toast.success("Bug Added successfully");
              onClose();
              navigate("/bugs");
            });
          });
        } else {
          bugService.create(data).then((res) => {
            setUpdate(!update);
            toast.success("Bug Added successfully");
            onClose();
            navigate("/bugs");
          });
        }
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div className="w-[60%] mx-auto bg-white rounded-xl px-12 pt-5 pb-4 flex flex-col my-5">
            <IoMdClose
              className="h-6 w-6 text-end self-end text-gray-300 hover:cursor-pointer hover:text-red-600 duration-300"
              onClick={onClose}
            />
            <h1 className="text-center text-[25px] font-[800] uppercase">
              Add Bug
            </h1>
            <hr className=" mb-8" />

            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2 gap-5 mb-1">
                <div className="">
                  <label className={`${style}`}>Project</label>
                  <select
                    value={data.project_id}
                    name="project_id"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full ${
                      errors["project_id"]
                        ? "border-red-600"
                        : "border-gray-300"
                    } text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  >
                    <option value="" disabled>
                      Select Project
                    </option>
                    {projects.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.project_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label className={`${style}`}>Bug Name</label>
                  <input
                    type="text"
                    name="bug_name"
                    value={data.bug_name}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]  ${
                      errors["bug_name"] ? "border-red-600" : "border-gray-300"
                    } border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer1`}
                    placeholder="Enter Bug Name"
                  />
                </div>
                <div className="">
                  <label className={`${style}`}>Priority</label>
                  <select
                    value={data.priority}
                    name="priority"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full ${
                      errors["priority"] ? "border-red-600" : "border-gray-300"
                    } text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                    id="grid-state"
                  >
                    <option value="" disabled>
                      Select Priority
                    </option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className={`${style}`}>Estimated Time</label>
                  <input
                    type="date"
                    name="estimated_time"
                    value={data.estimated_time}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px]  
                                            ${
                                              errors["estimated_time"]
                                                ? "border-red-600"
                                                : "border-gray-300"
                                            } 
                                                border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                    placeholder="Enter date "
                  />
                </div>
                <div className="">
                  <label className={`${style}`}>Feature</label>
                  <select
                    value={data.feature_id}
                    name="feature_id"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${
                      errors["feature_id"]
                        ? "border-red-600"
                        : "border-gray-300"
                    } `}
                    id="feature_id"
                  >
                    <option value="" disabled selected>
                      Select Feature
                    </option>
                    {features?.map((v) => (
                      <option value={v.id}>{v.feature_name}</option>
                    ))}
                  </select>
                  {!data.project_id && (
                    <p className="text-xs text-gray-400">
                      Select project first
                    </p>
                  )}
                </div>
                <div className="">
                  <label className={`${style}`}>Team</label>
                  <select
                    value={data.team_id}
                    name="team_id"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${
                      errors["team_id"] ? "border-red-600" : "border-gray-300"
                    } `}
                    id="team_id"
                  >
                    <option value="" disabled selected>
                      Select Team
                    </option>
                    {teams?.map((v) => (
                      <option value={v.id}>{v.team_name}</option>
                    ))}
                  </select>
                  {!data.project_id && (
                    <p className="text-xs text-gray-400">
                      Select project first
                    </p>
                  )}
                </div>
                <div className="">
                  <label className={`${style}`}>Member</label>
                  <select
                    value={data.user_id}
                    name="user_id"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${
                      errors["user_id"] ? "border-red-600" : "border-gray-300"
                    } `}
                    id="user_id"
                  >
                    <option value="" disabled selected>
                      Select Member
                    </option>
                    {members?.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  {!data.team_id && (
                    <p className="text-xs text-gray-400">Select team first</p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="w-[100%] px-5 py-2">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                      errors.image ? "border-red-600" : "border-gray-300"
                    }`}
                  >
                    {data.image ? (
                      <img
                        src={`${data.image}`}
                        alt=""
                        className={`rounded-lg object-contain h-56 w-full py-[2px]`}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="dropzone-file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={(e) => convertToBase64(e)}
                    />
                  </label>
                </div>
                <div>
                  <label className={`${style}`}>Bug Description</label>
                  <Textarea
                    type="text"
                    name="bug_description"
                    value={data.bug_description}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] h-28 px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] ${
                      errors["bug_description"]
                        ? "border-red-600"
                        : "border-gray-300"
                    } border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                    placeholder="Enter Bug Description"
                  />
                </div>
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
        </>
      )}
    </div>
  );
};

export default BugsModal;
