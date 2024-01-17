import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/job/${job.job_id}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            className="bg-white bg-opacity-75 py-4 w-full gap-3 border-b border-gray-200 px-2 cursor-pointer hover:shadow-md hover:bg-gray-100 transition-shadow"
        >
            <p className="text-xs">Posted {job.posted}</p>
            <h2 className="font-bold text-lg md:text-2xl">{job.title}</h2>
            <p className="text-base">{job.description}</p>
            <div className="flex justify-between py-2 pr-4">
                <p className="text-sm">
                    <strong>Experience:</strong> {job.experience}
                </p>
                <p className="text-sm">
                    <strong>Salary:</strong> {job.salary}
                </p>
                <p className="text-sm">
                    <strong>Job type:</strong> {job.type}
                </p>
            </div>
        </div>
    );
};

export default JobCard;
