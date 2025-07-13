import toast from "react-hot-toast";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import employeeService from "../api/services/employeeService";

import Loading from "../components/Loading";
import { IoMdClose } from "react-icons/io";

const EmployeesModal = ({
  edit = false,
  isOpen,
  onClose,
  trigger,
  setTrigger,
}) => {
  const style =
    "text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4";
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    designation: "",
    education: "",
    gender: "",
    age: "",
    phone: "",
    skills: "",
    joining_date: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    gender: false,
    designation: false,
    education: false,
    skills: false,
    joining_date: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        setLoading(true);
        employeeService.single(params.get("id")).then((res) => {
          setLoading(false);
          setData(res.employee);
          setData((prev) => ({
            ...prev,
            joining_date: moment(prev.joining_date).format("YYYY-MM-DD"),
          }));
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        name: "",
        email: "",
        designation: "",
        education: "",
        gender: "",
        age: "",
        phone: "",
        skills: "",
        joining_date: "",
      });
      setErrors({
        name: false,
        email: false,
        phone: false,
        gender: false,
        designation: false,
        education: false,
        skills: false,
        joining_date: false,
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
      if (data[v]?.length === 0) {
        setErrors((prevState) => ({ ...prevState, [v]: true }));
        hasError = true;
      }
    });

    if (hasError) {
      toast.error("Please fill all the required fields");
    } else {
      if (edit) {
        employeeService.update(data).then((res) => {
          setTrigger(!trigger);
          toast.success("Employee updated successfully");
          navigate("/employees");
        });
      } else {
        employeeService.create(data).then((res) => {
          setTrigger(!trigger);
          toast.success("Employee added successfully");
          onClose();
          navigate("/employees");
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
          <div className="w-[60%] mx-auto bg-[#202020] rounded-xl px-12 pt-10 pb-8 flex flex-col my-5">
            <IoMdClose
              className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300"
              onClick={onClose}
            />
            <h1 className="text-center text-3xl text-blue-500 font-[600] uppercase">
              Add Employee
            </h1>
            <hr className=" mb-8 border-gray-600" />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-5 lg:mb-1">
              <div>
                <div className="w-[100%] md:mb-0">
                  <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 
                                    rounded-[9px] border-[0.7px] border-gray-300 appearance-none    ${
                                      errors["name"]
                                        ? "border-red-600"
                                        : "border-gray-300"
                                    }  
                focus:outline-none focus:ring-0 focus:border-black peer`}
                    placeholder="Enter Your Name"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                    Email
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px]  
                                    ${
                                      errors["email"]
                                        ? "border-red-600"
                                        : "border-gray-300"
                                    } 
                                    border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                    placeholder="Enter Your Email "
                  />
                </div>
              </div>
              <div>
                <div className="w-[100%] lg:px-3">
                  <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={data.education}
                    onChange={(e) => handleChange(e)}
                    className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px]   ${
                      errors["education"] ? "border-red-600" : "border-gray-300"
                    } 
                   border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                    placeholder="Enter Your Education"
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4 lg:gap-5 mb-1">
              <div>
                <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={data.age}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px]   
                   ${errors["age"] ? "border-red-600" : "border-gray-300"} 
                   border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                  placeholder="Enter Age"
                />
              </div>

              <div>
                <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                  Phone
                </label>
                <input
                  type="text"
                  value={data.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] 
                     ${
                       errors["phone"] ? "border-red-600" : "border-gray-300"
                     } border-[0.7px]
                      border-gray-300 appearance-none  focus:outline-none focus:ring-0 focuis:border-black peer`}
                  placeholder="Enter Contact Number "
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-5 mb-1 mt-4">
              <div className="lg:col-span-2">
                <label className=" tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                  Skills
                </label>
                <input
                  type="text"
                  value={data.skills}
                  name="skills"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]  
                    ${errors["skills"] ? "border-red-600" : "border-gray-300"} 
                    border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                  placeholder="Enter Your Skills "
                />
              </div>
              <div>
                <label className={`${style}`}>Designation</label>
                <input
                  type="text"
                  value={data.designation}
                  name="designation"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]    ${
                    errors["designation"] ? "border-red-600" : "border-gray-300"
                  } 
                            border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                  placeholder="Enter designation "
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-5 mb-1 mt-4">
              <div className="lg:col-span-2">
                <label className={`${style}`}>Joining Date</label>
                <input
                  type="date"
                  name="joining_date"
                  value={data.joining_date}
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px]  
                  ${
                    errors["joining_date"]
                      ? "border-red-600"
                      : "border-gray-300"
                  } 
              border-[0.7px] border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer`}
                  placeholder="Enter date "
                />
              </div>
              <div className="w-[100%] ">
                <label className={`${style}`}>Gender</label>
                <select
                  value={data.gender}
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  className={`pl-4 block py-[9px] w-full text-sm bg-gray-50 rounded-[9px] border-[1px]    ${
                    errors["gender"] ? "border-red-600" : "border-gray-300"
                  } `}
                  id="gender"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => submit()}
                className="bg-blue-500 hover:font-bold text-white font-[600] py-2 px-[3rem] mt-4
                rounded-lg cursor-pointer"
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

export default EmployeesModal;
