import { Textarea } from "@headlessui/react";
import toast from "react-hot-toast";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import featureService from "../api/services/featureService";
import projectService from "../api/services/projectService";
import employeeService from "../api/services/employeeService";
import teamService from "../api/services/teamService";
import Loading from "../components/Loading";
import { IoMdClose } from "react-icons/io";
import uploadService from "../api/services/uploadService";

const FeaturesModal = ({ edit = false, isOpen, onClose, trigger, setTrigger }) => {
  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    project_id: "",
    feature_name: "",
    feature_description: "",
    // image: '',
    // priority: "",
    // completion_time: '',
    team_id: "",
    // user_id: "",
    // estimated_time: "",
  });

  const [errors, setErrors] = useState({
    project_id: false,
    feature_name: false,
    feature_description: false,
    // priority: false,
    // team_id: false,
    // user_id: "",
    // completion_time: false,
    // estimated_time: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (data.project_id) {
      const getTeams = async () => {
        setData((prev) => ({
          ...prev,
          team_id: "",
          // user_id: "",
        }));
        try {
          const response = await teamService.fetchteamByProject(
            data.project_id
          );
          setTeams(response.teams);
        } catch (e) { }
      };
      getTeams();
    }
  }, [data.project_id]);

  // useEffect(() => {
  //   if (data.team_id) {
  //     const getMembers = async () => {
  //       setData((prev) => ({
  //         ...prev,
  //         user_id: "",
  //       }));
  //       try {
  //         const response = await employeeService.fetchByTeam(data.team_id);
  //         setMembers(response.employees);
  //       } catch (e) { }
  //     };
  //     getMembers();
  //   }
  // }, [data.team_id]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await projectService.fetchAll();
        setLoading(false);
        setProjects(response.projects);
      } catch (e) { }
    };
    getProjects();
  }, []);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        setLoading(true);
        featureService.single(params.get("id")).then((res) => {
          console.log(res.feature);
          setLoading(false);
          setData(res.feature);
          setData((prev) => ({
            ...prev,
            estimated_time: moment(prev.estimated_time).format("YYYY-MM-DD"),
          }));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        project_id: "",
        feature_name: "",
        feature_description: "",
        // image: '',
        // priority: "",
        // completion_time: '',
        team_id: "",
        // user_id: "",
        // estimated_time: "",
      });
      setErrors({
        project_id: false,
        feature_name: false,
        feature_description: false,
        // priority: false,
        // team_id: false,
        // user_id: "",
        // completion_time: false,
        // estimated_time: false,
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
      setData(prev => ({
        ...prev,
        image: e.target.files[0]
      }))
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
    Object.keys(errors).map((v) => {
      if (data[v]?.length === 0) {
        console.log(v)
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });
    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (data.team_id === "") {
      }
      if (edit) {

        let feature = { ...data }
        if (feature?.team_id === "") {
          feature.team_id = 0
        }
        if (file) {
          uploadService.single(file).then(result => {
            feature.image = result.response.url
            featureService.update(feature).then((res) => {
              setTrigger(!trigger)
              toast.success("Feature updated successfully");
              navigate("/features");
            });
          })
        }
        else {
          featureService.update(feature).then((res) => {
            setTrigger(!trigger)
            toast.success("Feature updated successfully");
            navigate("/features");
          });
        }
      } else {
        let feature = { ...data }
        if (feature?.team_id === "") {
          feature.team_id = 0
        }
        if (file) {
          uploadService.single(file).then(result => {
            feature.image = result.response.url
            featureService.create(feature).then((res) => {
              setTrigger(!trigger)
              toast.success("Feature added successfully");
              onClose();
              navigate("/features");
            });
          })
        }
        else {
          featureService.create(feature).then((res) => {
            setTrigger(!trigger)
            toast.success("Feature added successfully");
            onClose();
            navigate("/features");
          });
        }
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-[60%] h-[98vh] mx-auto bg-white rounded-xl px-12 pt-5 pb-4 flex flex-col my-5">
            <IoMdClose
              className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300"
              onClick={onClose}
            />
            <h1 className="text-center text-[25px] font-[800] uppercase">
              Add feature
            </h1>
            <hr className=" mb-8" />

            <div className="grid grid-cols-2 gap-5">
              <div className="">
                <div className="grid grid-cols-2 gap-5 mb-1">
                  <div className="">
                    <div className="">
                      <label className={`${style}`}>Project</label>
                      <select
                        value={data.project_id}
                        name="project_id"
                        onChange={(e) => handleChange(e)}
                        className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${errors["project_id"]
                          ? "border-red-600"
                          : "border-gray-300"
                          } `}
                        id="gender"
                      >
                        <option value="" disabled>
                          Select Project
                        </option>
                        {projects.map((v) => (
                          <option value={v.id}>{v.project_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <label className={`${style}`}>Team</label>
                    <select
                      value={data.team_id}
                      name="team_id"
                      onChange={(e) => handleChange(e)}
                      className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${errors["team_id"]
                        ? "border-red-600"
                        : "border-gray-300"
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

                  </div>

                </div>
                <div className="grid grid-cols-1">
                  <div className="">
                    <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                      Feature Name
                    </label>
                    <input
                      type="text"
                      value={data.feature_name}
                      name="feature_name"
                      onChange={(e) => handleChange(e)}
                      className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]  
                                            ${errors["feature_name"]
                          ? "border-red-600"
                          : "border-gray-300"
                        } 
                    border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                      placeholder="Enter feature name"
                    />
                  </div>

                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 mb-4 h-[20%]">
                <div className="mb-3">
                  <div className="w-[100%] px-5 py-2">
                    <label
                      htmlFor="dropzone-file"
                      className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${errors.image ? "border-red-600" : "border-gray-300"
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
                </div>
              </div>
            </div>
            <div>
              <div>
                <label className={`${style}`}>Feature Description</label>
                <Textarea
                  type="text"
                  name="feature_description"
                  value={data.feature_description}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block h-28 py-[9px] w-full ${errors["feature_description"]
                    ? "border-red-600"
                    : "border-gray-300"
                    } text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  placeholder="Enter Feature Description"
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
        </>
      )}
    </div>
  );
};

export default FeaturesModal;
