import React, {useEffect, useState} from 'react';
import {Dialog} from "@mui/material";

const DeleteModal = ({open, setOpen, deleteFunction, deleting}) => {

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (clicked){
            if (!deleting){
                handleClose()
            }
        }
    }, [clicked, deleting]);

    const handleClose = () => {
        setOpen(!open)
    }
    const handleDelete = () => {
        deleteFunction()
        setClicked(true)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" PaperProps={{style: {borderRadius: 20, padding: 15}}}>
            {deleting ?
                <center>
                    <div className="flex justify-center items-center w-[350px] py-7 px-5 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
                    </div>
                </center>
                :
                <div className="relative w-full bg-white">
                    <div onClick={() => handleClose()} className="absolute right-2 top-2 cursor-pointer">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </div>
                    <div className="w-[350px] py-7 px-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-9 h-9 :text-gray-200" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="font-bold">Are you sure you want to delete?</h3>
                        <div className="mt-5">
                            <button onClick={() => handleClose()}
                                    className="w-[120px] mr-1 rounded-xl border-gray-800 border-[1px] py-2 text-black font-medium hover:bg-gray-200 hover:text-gray-800">Cancel
                            </button>
                            <button onClick={() => handleDelete()}
                                    className="w-[120px] ml-1 rounded-xl bg-red-600 text-white py-2 font-medium hover:bg-red-700">Delete
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Dialog>
    );
};

export default DeleteModal;
