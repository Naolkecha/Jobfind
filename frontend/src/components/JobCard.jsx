import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const jobId = job._id;
    
    console.log('Job Salary:', job.salaryRange);
    const handleNavigate = () => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            className="bg-white bg-opacity-75 py-4 w-full gap-3 border-b border-gray-200 px-2 cursor-pointer hover:shadow-md hover:bg-gray-100 transition-shadow"
        >
            <p className="text-xs">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
            <h2 className="font-bold text-lg md:text-2xl">{job.title}</h2>
            <p className="text-base">{job.description}</p>
            <div className="flex justify-between py-2 pr-4">
                <p className="text-sm">
                    <strong>Company:</strong> {job.company}
                </p>
                {/* <p className="text-sm">
                    <strong>Location:</strong> {job.location}
                </p> */}
                <p className="text-sm">
                    <strong>Employment Type:</strong> {job.employmentType}
                </p>
                <p className="text-sm">
                    <strong>Salary Range:</strong> ${job.salaryRange.min} - ${job.salaryRange.max}
                </p>
            </div>
        </div>
    
    );
};

export default JobCard;
