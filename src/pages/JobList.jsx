import React from 'react';
import SideFilter from '../components/SideFilter';
import JobCard from '../components/JobCard';

const JobList = () => {
    const jobs = [
        {
            job_id: 1,
            posted: '2hr ago',
            title: 'Senior Software Developer',
            description: 'Join our dynamic team as a Senior Software Developer. You will lead development efforts, mentor junior developers, and design scalable software solutions. Collaborate with cross-functional teams to define, design, and ship new features. We are looking for someone with a passion for clean code, innovative problem-solving, and a strong grasp of best practices in software engineering.',
            experience: 'Entry level',
            salary: '25k',
            type: 'Full time',
        },
        {
            job_id: 2,
            posted: '1 day ago',
            title: 'Frontend Developer',
            description: 'We are seeking a talented Frontend Developer to create visually stunning, responsive web applications. You will work closely with designers and backend developers to implement user-friendly interfaces. Proficiency in React, CSS, and JavaScript is required. This role offers a unique opportunity to shape the look and feel of our platform.',
            experience: 'Mid level',
            salary: '20k',
            type: 'Full time',
        },
        {
            job_id: 3,
            posted: '3 days ago',
            title: 'Backend Developer',
            description: 'Looking for a Backend Developer to build and maintain robust, scalable server-side applications. The ideal candidate should have experience with REST API development, database design (both SQL and NoSQL), and cloud deployment. Your contributions will ensure seamless data management and smooth system performance.',
            experience: 'Senior level',
            salary: '30k',
            type: 'Part time',
        },
        {
            job_id: 4,
            posted: '1 week ago',
            title: 'Full-Stack Developer',
            description: 'We need a Full-Stack Developer who is passionate about delivering end-to-end solutions. From crafting stunning UIs to designing efficient backend systems, you will play a pivotal role in developing our products. Prior experience with React, Node.js, and MongoDB is a plus. Join us and contribute to exciting projects in a collaborative environment.',
            experience: 'Junior level',
            salary: '22k',
            type: 'Hybrid',
        },
    ];

    return (
        <div className='flex flex-col gap-4 p-4 h-screen bg-white overflow-hidden'>
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
