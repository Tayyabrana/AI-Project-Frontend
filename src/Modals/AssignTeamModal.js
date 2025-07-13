import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import teamEmployeeService from "../api/services/teamEmployeeService";
import teamService from "../api/services/teamService";
import employeeService from "../api/services/employeeService";

import Loading from "../components/Loading";

const AssignTeamModal = ({ edit = false, isOpen, onClose, trigger, setTrigger }) => {
  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";

  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    role: "",
    employee_id: "",
    team_id: "",
  });
  const [errors, setErrors] = useState({
    role: false,
    employee_id: false,
    team_id: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const response = await teamService.fetchAll();
        setTeams(response.teams);
        setLoading(false);
      } catch (e) { }
    };
    getTeams();
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      try {
        setLoading(true);
        const response = await employeeService.fetchAll();
        setMembers(response.employees);
        setLoading(false);
      } catch (e) { }
    };
    getMembers();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        role: "",
        employee_id: "",
        team_id: "",
      });
      setErrors({
        role: false,
        employee_id: false,
        team_id: false,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        console.log(params.get("id"));
        setLoading(true);
        teamEmployeeService.single(params.get("id")).then((res) => {
          setLoading(false);
          setData(res.teamEmployee);
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
      if (data[v].length === 0) {
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });
    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (edit) {
        teamEmployeeService.update(data).then((res) => {
          setTrigger(!trigger)
          toast.success("Role updated successfully");
          navigate("/assignTeam");
        });
      } else {
        teamEmployeeService.create(data).then((res) => {
          setTrigger(!trigger)
          toast.success("Role assigned successfully");
          onClose()
          navigate("/assignTeam");
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
        <>
          <div className="w-[60%] mx-auto bg-white rounded-xl px-12 pt-10 pb-8 flex flex-col my-5">
            <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300" onClick={onClose} />
            <h1 className="text-center text-[25px] font-[800] uppercase">
              Assign Team{" "}
            </h1>
            <hr className=" mb-8" />
            <div className="grid grid-cols-2 gap-5 mb-1">
              <div className=" col-span-1">
                <label className="text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                  Role
                </label>
                <input
                  type="text"
                  value={data.role}
                  name="role"
                  id="floating_email"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]
                         ${errors["role"] ? "border-red-600" : "border-gray-300"
                    }
                        border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                  placeholder="Enter Team Role"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-1">
              <div className="">
                <label className={`${style}`}>Team</label>
                <select
                  value={data.team_id}
                  name="team_id"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${errors["team_id"] ? "border-red-600" : "border-gray-300"
                    }`}
                  id="grid-state"
                >
                  <option value="" disabled>
                    Select Team
                  </option>
                  {teams.map((v) => (
                    <option value={v.id}>{v.team_name}</option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className={`${style}`}>Employee</label>
                <select
                  value={data.employee_id}
                  name="employee_id"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]  ${errors["employee_id"] ? "border-red-600" : "border-gray-300"
                    }`}
                  id="grid-state"
                >
                  <option value="" disabled>
                    Select Employee
                  </option>
                  {members.map((v) => (
                    <option value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" mt-[-1.2rem] mb-6"></div>
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

export default AssignTeamModal;
