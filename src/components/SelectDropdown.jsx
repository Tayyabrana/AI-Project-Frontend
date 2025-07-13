import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import projectService from '../api/services/projectService';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const SelectDropdown = ({ id, currentStatus, handleTriggerChange }) => {
    const navigate = useNavigate()
    const [projectStatus, setProjectStatus] = useState(currentStatus)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(projectStatus === 0 ? "Pending" : projectStatus === 1 ? "In Progress" : projectStatus === 2 ? "Completed" : projectStatus === 3 ? "Ended" : projectStatus === 4 ? "Idle" : "Closed");
    // const options = ['Default', 'Active', 'Pending'];
    const statusOptions = [
        { label: "Start", action: "start", availableIn: [0] },
        { label: "Restart", action: "start", availableIn: [4, 5] },
        { label: "Mark Complete", action: "complete", availableIn: [1, 4] },
        { label: "Mark End", action: "end", availableIn: [1, 4, 5] },
        { label: "Mark Idle", action: "idle", availableIn: [1] },
        { label: "Mark Close", action: "close", availableIn: [1, 4] },
    ];

    const toggling = () => setIsOpen(!isOpen);
    const dropdownRef = useRef(null);

    const handleAction = async (action) => {
        try {
            switch (action) {
                case "start":
                    let payloadStart = {
                        start_time: moment().format("YYYY-MM-DD"),
                        id: id
                    };
                    await projectService.start(payloadStart);
                    toast.success("Project Started");
                    break;
                case "complete":
                    let payloadComplete = {
                        end_time: moment().format("YYYY-MM-DD"),
                        id: id
                    };
                    await projectService.complete(payloadComplete);
                    toast.success("Project Completed");
                    break;
                case "end":
                    let payloadEnd = {
                        end_time: moment().format("YYYY-MM-DD"),
                        id: id
                    };
                    await projectService.end(payloadEnd);
                    toast.success("Project Ended");
                    break;
                case "idle":
                    await projectService.idle(id);
                    toast.success("Project Marked Idle");
                    break;
                case "close":
                    await projectService.close(id);
                    toast.success("Project Closed");
                    break;
                default:
                    toast.error("Unknown action");
                    break;
            }

            // Trigger the state change in the parent component to refetch the projects
            handleTriggerChange();
        } catch (error) {
            console.error("Action failed", error);
            toast.error("Failed to update project status");
        }
    };


    const onOptionClicked = (value) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='inline-flex'>
            <div ref={dropdownRef} className='relative inline-flex rounded-lg bg-white'>
                <a onClick={toggling} className={`w-full text-white rounded-full px-3 py-1 text-[12px] hover:cursor-pointer ${projectStatus === 0 ? "bg-red-500" : projectStatus === 1 ? "bg-yellow-600" : projectStatus === 2 ? "bg-green-600" : projectStatus === 3 ? "bg-black" : projectStatus === 4 ? "bg-gray-400" : "bg-black text-white"}`}>
                    {selectedOption || "Default"}
                </a>
                {isOpen && (
                    <div className='absolute top-12 left-0 z-10 mt-4 min-w-[150px] origin-top-right rounded-md border border-gray-100 bg-white shadow-lg'>
                        {/* {options.map((option) => (
                            <button
                                key={option}
                                type='button'
                                onClick={() => onOptionClicked(option)}
                                className='w-full text-left'
                            >
                                <div className={`block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 `}>
                                    {option}
                                </div>
                            </button>
                        ))} */}
                        {statusOptions
                            .filter((option) => option.availableIn.includes(projectStatus)) // Filter options based on project status
                            .map((option) => (
                                <button
                                    key={option.action}
                                    onClick={() => handleAction(option.action)}
                                    className='w-full text-left'
                                >
                                    <div className={`block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 `}>
                                        {option.label}
                                    </div>
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectDropdown;