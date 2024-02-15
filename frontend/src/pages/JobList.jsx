import React from 'react';
import SideFilter from '../components/SideFilter';
import JobCard from '../components/JobCard';
import api from '../services/api';
import { useEffect, useState } from 'react';

const JobList = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.getJobs();
                setJobs(response);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='flex flex-col gap-4 p-4  bg-white overflow-hidden'>
            {/* Search Bar */}
            <div className="flex items-center justify-center h-full sticky top-0 bg-white z-10">
                <div className="bg-white bg-opacity-75 p-4 border-b flex w-full max-w-screen-md gap-3">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className='bg-blue-500 px-4 py-2 text-white rounded'>Search</button>
                </div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-4 w-full h-full'>
                {/* Sidebar */}
                <div className='col-span-1 hidden md:block sticky top-0'>
                    <SideFilter />
                </div>

                {/* Job Cards (Scrollable Area) */}
                <div className='col-span-full md:col-span-3 px-3 mx-2 overflow-y-auto'>
                    {jobs.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobList;
