import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import teamService from "../api/services/teamService";
import projectService from "../api/services/projectService";
import projectTeamService from "../api/services/projectTeamService";

import Loading from "../components/Loading";


const AssignProjectModal = ({ edit = false, isOpen, onClose }) => {
  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    team_id: "",
    project_id: "",
  });

  const [errors, setErrors] = useState({
    team_id: false,
    project_id: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const response = await teamService.fetchAll();
        setLoading(false);
        setTeams(response.teams);
      } catch (e) { }
    };
    getTeams();
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await projectService.fetchAll();
        setProjects(response.projects);
      } catch (e) { }
    };
    getProjects();
  }, []);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        console.log(params.get("id"));
        setLoading(true);
        projectTeamService.single(params.get("id")).then((res) => {
          setLoading(false);
          console.log(res.client);
          setData(res.projectTeam);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && !edit) {
      setData({
        team_id: "",
        project_id: "",
      });
      setErrors({
        team_id: false,
        project_id: false,
      });
    }
  }, [isOpen, edit]);

  const handleChange = (e) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
    if (e.target.value.length > 0) {
      setErrors((prevState) => ({ ...prevState, [e.target.name]: false }));
    }
  };

  const submit = () => {
    let hasError = false;
    Object.keys(data).map((v) => {
      if (data[v].length === 0) {
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });

    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (edit) {
        setLoading(true);
        projectTeamService.update(data).then((res) => {
          setLoading(false);
          navigate("/assignProjects");
        });
      } else {
        setLoading(true);
        projectTeamService.create(data).then((res) => {
          setLoading(false);
          toast.success("Project assigned successfully");
          onClose()
          navigate("/assignProjects");
        });
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="w-[60%]  mx-auto bg-white rounded-xl px-12 pt-10 pb-8 flex flex-col my-5">
            <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300" onClick={onClose} />
            <h1 className="text-center text-[25px] font-[800] uppercase">
              Allocate Project
            </h1>
            <hr className=" mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5  mb-1">
              <div className="col-span-1">
                <label className={`${style}`}>Team</label>
                <select
                  value={data.team_id}
                  name="team_id"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full ${errors["team_id"] ? "border-red-600" : "border-gray-300"
                    } text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  id="grid-state"
                >
                  <option value="" disabled selected>
                    Select Team
                  </option>
                  {teams.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.team_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-[100%] ">
                <label className={`${style}`}>Project</label>
                <select
                  value={data.project_id}
                  name="project_id"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] ${errors["project_id"] ? "border-red-600" : "border-gray-300"
                    } w-full text-sm bg-gray-50 rounded-[9px] border-[1px]`}
                  id="grid-state"
                >
                  <option value="" disabled selected>
                    Select Project
                  </option>
                  {projects.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.project_name}
                    </option>
                  ))}
                </select>
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
      </>
    </div>
  );
};

export default AssignProjectModal;
