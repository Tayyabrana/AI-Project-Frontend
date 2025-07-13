import toast from "react-hot-toast";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import taskService from "../api/services/taskService";
import projectService from "../api/services/projectService";
import teamService from "../api/services/teamService";
import employeeService from "../api/services/employeeService";
import uploadService from "../api/services/uploadService";
import featureService from "../api/services/featureService";

import Loading from "../components/Loading";
import { IoMdClose } from "react-icons/io";
import { Textarea } from "@headlessui/react";


const TaskModal = ({ edit = false, isOpen, onClose, trigger, setTrigger }) => {
    const style =
        "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";
    const [projects, setProjects] = useState([]);
    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);
    const [features, setFeatures] = useState([])


    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();

    const [data, setData] = useState({
        project_id: "",
        task_name: "",
        task_description: "",
        image: '',
        team_id: "",
        feature_id: "",
        user_id: "",
        priority: "",
        // completion_time: '',
        estimated_time: "",
    });


    const [errors, setErrors] = useState({
        project_id: false,
        task_name: false,
        task_description: false,
        priority: false,
        team_id: false,
        user_id: false,
        feature_id: "",
        image: false,
        estimated_time: false,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (edit) {
            if (params.get("id")) {
                setLoading(true);
                taskService.single(params.get("id")).then((res) => {
                    console.log(res.task);
                    setLoading(false);
                    setData(res.task);
                    setData((prev) => ({
                        ...prev,
                        estimated_time: moment(prev.estimated_time).format("YYYY-MM-DD"), // Update joining_date
                    }));
                });
            }
        }
    }, []);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await projectService.fetchAll(data.project_id);
                setProjects(response.projects);
            } catch (e) {
            }
        };
        getProjects();
    }, []);

    useEffect(() => {
        if (data.project_id) {
            setData((prev) => ({
                ...prev,
                team_id: "",
                user_id: "",
                feature_id: ""
            }));
            const getTeams = async () => {
                try {
                    const response = await teamService.fetchteamByProject(data.project_id);
                    setTeams(response.teams);
                } catch (e) {
                }
            };
            getTeams();
            const getFeatures = async () => {
                try {
                    const response = await featureService.fetchByProject(data.project_id);
                    setFeatures(response.features);
                } catch (e) { }
            };
            getFeatures();
        }
    }, [data.project_id]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            user_id: "",
        }));
        const getMembers = async () => {
            try {
                const response = await employeeService.fetchByTeam(data.team_id);
                setMembers(response.employees);
            } catch (e) {
            }
        };
        getMembers();
    }, [data.team_id]);

    useEffect(() => {
        if (isOpen) {
            setData({
                project_id: "",
                task_name: "",
                task_description: "",
                image: '',
                team_id: "",
                feature_id: "",
                user_id: "",
                priority: "",
                // completion_time: '',
                estimated_time: "",
            });
            setErrors({
                project_id: false,
                task_name: false,
                task_description: false,
                priority: false,
                team_id: false,
                user_id: false,
                feature_id: "",
                image: false,
                estimated_time: false,
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
        Object.keys(data).map((v) => {

            if (v !== "image" && data[v]?.length === 0) {
                setErrors((prevState) => ({ ...prevState, [v]: true }));
                hasError = true;
            }
        });
        if (hasError) {
            toast.error("Please fill all the required fields");
        } else {
            if (edit) {
                if (file) {
                    uploadService.single(file).then(result => {
                        let task = { ...data }
                        task.image = result.response.url
                        taskService.update(task).then((res) => {
                            setTrigger(!trigger)
                            toast.success("Task updated successfully");
                            navigate("/tasks");
                        });
                    })

                }
                taskService.update(data).then((res) => {
                    setTrigger(!trigger)
                    toast.success("Task updated successfully");
                    navigate("/tasks");
                });
            } else {
                if (file) {
                    uploadService.single(file).then(result => {
                        let task = { ...data }
                        task.image = result.response.url
                        taskService.create(task).then((res) => {
                            toast.success("Task added successfully");
                            onClose()
                            navigate("/tasks");
                        });
                    })
                }
                else {
                    taskService.create(data).then((res) => {
                        toast.success("Task added successfully");
                        onClose()
                        navigate("/tasks");
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
                    <div className="w-[70%] h-[98vh] mx-auto bg-white rounded-xl px-12 pt-4 pb-4 flex flex-col">
                        <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-500 hover:cursor-pointer" onClick={onClose} />
                        <h1 className="text-center text-[25px] font-[800] uppercase">
                            Add Task
                        </h1>
                        <hr className=" mb-8" />

                        <div className="grid grid-cols-2 gap-5">
                            <div className="">
                                <div className="grid grid-cols-2 gap-5 mb-1">
                                    <div className="">
                                        <div className="">
                                            <label className={`${style}`}>Project ID</label>
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
                                        <label
                                            className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                                            Task Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.task_name}
                                            name="task_name"
                                            onChange={(e) => handleChange(e)}
                                            className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]  
                                            ${errors["task_name"]
                                                    ? "border-red-600"
                                                    : "border-gray-300"
                                                } 
                    border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                                            placeholder="Enter Task name"
                                        />
                                    </div>
                                    <div className=" ">
                                        <label className={`${style}`}>Priority</label>
                                        <select
                                            value={data.priority}
                                            name="priority"
                                            onChange={(e) => handleChange(e)}
                                            className={`pl-4 block py-[9px] w-full ${errors["priority"]
                                                ? "border-red-600"
                                                : "border-gray-300"
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
                                            ${errors["estimated_time"]
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
                                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px] ${errors["feature_id"]
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
                                            <p className="text-xs text-gray-400">Select project first </p>
                                        )}
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
                                        {!data.project_id && (
                                            <p className="text-xs text-gray-400">Select project first </p>
                                        )}                                    </div>
                                    <div className="">
                                        <label className={`${style}`}>Member</label>
                                        <select
                                            value={data.user_id}
                                            name="user_id"
                                            onChange={(e) => handleChange(e)}
                                            className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${errors["user_id"]
                                                ? "border-red-600"
                                                : "border-gray-300"
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
                                            <p className="text-xs text-gray-400">Select team first </p>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                <div>
                                    <label className={`${style}`}>Task Description</label>
                                    <Textarea
                                        type="text"
                                        name="task_description"
                                        value={data.task_description}
                                        onChange={(e) => handleChange(e)}
                                        className={`pl-4 py-[9px] h-28 px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] ${errors["task_description"]
                                            ? "border-red-600"
                                            : "border-gray-300"
                                            } border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                                        placeholder="Enter Task Description"
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

export default TaskModal;
