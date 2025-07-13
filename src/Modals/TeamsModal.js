import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import teamService from "../api/services/teamService";
import Loading from "../components/Loading";

import { IoMdClose } from "react-icons/io";

const TeamsModal = ({ edit = false, isOpen, onClose, trigger, setTrigger }) => {

  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    team_name: "",
    team_designation: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({
    team_name: false,
    team_designation: false,
    purpose: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        setLoading(true);
        teamService.single(params.get("id")).then((res) => {
          console.log(res.team);
          setLoading(false);
          setData(res.team);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        team_name: "",
        team_designation: "",
        purpose: "",
      });
      setErrors({
        team_name: false,
        team_designation: false,
        purpose: false,
      });
    }
  }, [isOpen]);

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
        teamService.update(data).then((res) => {
          toast.success("Team updated successfully")
          setTrigger(!trigger)
          navigate("/teams");
        });
      } else {
        teamService.create(data).then((res) => {
          setTrigger(!trigger)
          toast.success("Team added successfully")
          onClose()
          navigate("/teams");
        });
      }
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div className="w-[60%] mx-auto bg-white rounded-xl px-12 pt-10 pb-8 flex flex-col my-5">
            <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300" onClick={onClose} />
            <h1 className="text-center text-[25px] font-[800] uppercase">
              Add Team
            </h1>
            <hr className=" mb-8" />
            <div className="grid grid-cols-2 gap-5 mb-1">
              <div>
                <label className="text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                  Team Name
                </label>
                <input
                  type="text"
                  name="team_name"
                  id="team_name"
                  value={data.team_name}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer ${errors["team_name"] ? "border-red-600" : "border-gray-300"
                    }  `}
                  placeholder="Enter Team Name"
                />
              </div>
              <div>
                <label className={`${style}`}>Team Designation</label>
                <input
                  type="text"
                  name="team_designation"
                  id="team_designation"
                  value={data.team_designation}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer ${errors["team_designation"]
                    ? "border-red-600"
                    : "border-gray-300"
                    }  `}
                  placeholder="Enter Designation"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-1">
              <div className="col-span-2">
                <label className={`${style}`}>Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  id="purpose"
                  value={data.purpose}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer ${errors["purpose"] ? "border-red-600" : "border-gray-300"
                    }  `}
                  placeholder="Enter Purpose"
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

export default TeamsModal;
