import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import clientService from "../api/services/clientService";

import Loading from "../components/Loading";


const ClientsModal = ({ edit = false, isOpen, onClose, trigger, setTrigger }) => {
  const style = "";

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    source: "",
    type: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [errors, setErrors] = useState({
    name: false,
    source: false,
    type: false,
  });



  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (edit) {
      if (params.get("id")) {
        console.log(params.get("id"));
        setLoading(true);
        clientService.single(params.get("id")).then((res) => {
          setLoading(false);
          console.log(res.client);
          setData(res.client);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData({
        name: "",
        source: "",
        type: "",
      });
      setErrors({
        name: false,
        source: false,
        type: false,
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
        clientService.update(data).then((res) => {
          setTrigger(!trigger)
          navigate("/clients");
        });
      } else {
        clientService.create(data).then((res) => {
          setTrigger(!trigger)
          toast.success("Client added successfully")
          onClose()
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
        <div className="w-[60%] mx-auto bg-white rounded-xl md:px-12 px-8  pt-10 pb-8 flex flex-col my-5">
          <IoMdClose className="h-6 w-6 text-end self-end text-gray-300 hover:text-red-600 hover:cursor-pointer duration-300" onClick={onClose} />
          <h1 className="text-center text-[25px] font-[800] uppercase">
            {edit ? "Edit Client" : "Add Client"}
          </h1>
          <hr className="mb-8" />
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-2 mb-1">
            <div>
              <label className="text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter client name "
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]
                                 ${errors["name"]
                    ? "border-red-600"
                    : "border-gray-300"
                  } 
                                 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder="Enter Your Name`}
              />
            </div>
            <div>
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Source
              </label>
              <input
                type="text"
                name="source"
                value={data.source}
                onChange={(e) => handleChange(e)}
                placeholder=" Enter Source"
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px] 
                                ${errors["source"]
                    ? "border-red-600"
                    : "border-gray-300"
                  } appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder="Enter Source`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2  md:gap-5 mb-1">
            <div className="col-span-1">
              <label
                className={`text-left tracking-wide text-grey-darker text-[0.7rem] font-[600] mb-[3px] ml-4`}
              >
                Type
              </label>
              <input
                type="text"
                name="type"
                value={data.type}
                onChange={(e) => handleChange(e)}
                placeholder="Enter type of client"
                className={`pl-4 py-[9px] px-0 w-full text-sm text-gray-900 bg-gray-50 rounded-[9px] border-[0.7px]
                                 ${errors["type"]
                    ? "border-red-600"
                    : "border-gray-300"
                  } appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                            placeholder="Enter Source`}
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

export default ClientsModal;
