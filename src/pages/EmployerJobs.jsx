import React, { useState } from 'react';
import AddJob from './AddJob';

const EmployerDashboard = () => {
    const [currentPage, setCurrentPage] = useState('jobsList');
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    // Mock Data for Jobs
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'Addis Ababa',
            minSalary: 5000,
            maxSalary: 8000,
            skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React'],
            description: 'We are looking for a skilled frontend developer. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, tempore. Modi veritatis tempora explicabo numquam itaque quis, vitae maxime soluta, quibusdam saepe sunt aliquid dignissimos? Quisquam, quidem. ',
            applicants: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    skills: ['HTML', 'CSS', 'React', 'Redux'],
                    cvLink: 'https://example.com/john-cv.pdf',
                    coverLetter: 'I am passionate about building beautiful UIs and robust applications. Hire me!  I am passionate about building beautiful UIs and robust applications. Hire me! I am passionate about building beautiful UIs and robust applications. Hire me! ',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    skills: ['JavaScript', 'Tailwind CSS', 'React'],
                    cvLink: 'https://example.com/jane-cv.pdf',
                    coverLetter: 'I bring experience and creativity to frontend development projects.',
                },
            ],
        },
        {
            id: 2,
            title: 'Backend Developer',
            company: 'Soft Innovations',
            location: 'Remote',
            minSalary: 6000,
            maxSalary: 10000,
            skillsRequired: ['Python', 'Django', 'REST APIs', 'SQL'],
            description: 'Join our backend team to work on exciting projects.',
            applicants: [
                {
                    id: 3,
                    name: 'Michael Johnson',
                    email: 'michael.johnson@example.com',
                    skills: ['Python', 'Django', 'REST APIs', 'SQL'],
                    cvLink: 'https://example.com/michael-cv.pdf',
                    coverLetter: 'Backend development is my passion, and I strive to create scalable solutions.',
                },
            ],
        },
    ]);

    const handleDeleteJob = (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            setJobs(jobs.filter((job) => job.id !== jobId));
            setSelectedJob(null);
            alert('Job deleted successfully!');
        }
    };

    const handleContactApplicant = (email) => {
        window.location.href = `mailto:${email}?subject=Job%20Application&body=Dear%20Applicant,`;
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            alert('You have been logged out.');
            // Implement real logout logic here
        }
    };

    return (
        <div className="flex h-svh bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-md p-4 flex flex-col justify-between">
               <div>
                <h2 className="text-2xl font-bold mb-6 text-blue-600">Employer Dashboard</h2>
                <ul>
                    <li
                        className={`cursor-pointer p-2 mb-2 rounded ${currentPage === 'jobsList' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => {
                            setCurrentPage('jobsList');
                            setSelectedJob(null);
                        }}
                    >
                        Jobs List
                    </li>
                    <li
                        className={`cursor-pointer p-2 mb-2 rounded ${currentPage === 'addJob' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setCurrentPage('addJob')}
                    >
                        Add New Job
                    </li>
                    <li
                        className={`cursor-pointer p-2 mb-2 rounded ${currentPage === 'profile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setCurrentPage('profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={`cursor-pointer p-2 mb-2 rounded ${currentPage === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        onClick={() => setCurrentPage('settings')}
                    >
                        Settings
                    </li>
                </ul>
                </div>
                <button
                    className=" w-full text-left p-2 rounded text-red-500 hover:bg-red-100"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6 overflow-auto">
                {/* Jobs List Page */}
                {currentPage === 'jobsList' && !selectedJob && (
                    <>
                        <h1 className="text-xl font-bold mb-3 px-2">Jobs Posted</h1>
                        {jobs.length === 0 ? (
                            <p>No jobs have been posted yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-2 px-2">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="bg-white py-7 border-b cursor-pointer px-5"
                                        onClick={() => setSelectedJob(job)}
                                    > 
                                       <div className='flex justify-between items-center mb-2'>
                                        <h2 className="text-lg font-bold">Position:  {job.title}</h2>
                                        <h2> Posted: Dec 25, 2024</h2>
                                        </div>

                                       <p> {job.description}</p> 
                                        
                                        <div className='flex justify-between items-center '>
                                        <p>
                                            <strong>Location:</strong> {job.location}
                                        </p>
                                        <p>
                                            <strong>Salary:</strong> ${job.minSalary} - ${job.maxSalary}
                                        </p>
                                        <p>
                                            <strong>Applicants:</strong> {job.applicants.length}
                                        </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Selected Job Details */}
                {selectedJob && (
                    <div>
                        <button
                            className="text-blue-500 hover:text-blue-700 mb-4 "
                            onClick={() => setSelectedJob(null)}
                        >
                            &larr; Back to Jobs List
                        </button>
                        <div className='flex justify-between items-center mb-2'>
                        <h1 className="text-xl font-bold">{selectedJob.title}</h1>
                        <h2 className="text-xl font-semibold mb-4">Posted: Dec 26, 2024</h2>
                        </div>
                        <div className='flex justify-between items-center mb-4'>
                        <p>
                            <strong>Company:</strong> {selectedJob.company}
                        </p>
                        <p>
                            <strong>Location:</strong> {selectedJob.location}
                        </p>
                        <p>
                            <strong>Salary:</strong> ${selectedJob.minSalary} - ${selectedJob.maxSalary}
                        </p>
                        </div>
                        <p className="mb-4">{selectedJob.description}</p>
                        <p>Skills: {selectedJob.skillsRequired.join(', ')}</p>

                        {/* Applicants Section */}
                        <h2 className="text-lg font-bold mt-4 mb-2">Applicants({selectedJob.applicants.length})</h2>
                        {selectedJob.applicants.length > 0 ? (
                            selectedJob.applicants.map((applicant) => (
                                <div
                                    key={applicant.id}
                                    className="bg-gray-50 p-4 rounded mb-4 "
                                >
                                    <h3 className="text-lg font-bold ">{applicant.name}</h3>
                                    <p>
                                        <strong>Email:</strong> {applicant.email}
                                    </p>
                                    <p>
                                        <strong>Skills:</strong> {applicant.skills.join(', ')}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Cover Letter:</strong> 
                                        <p className='py-2 px-2 border rounded-md'>{applicant.coverLetter}</p>
                                    </p>
                                    <a
                                        href={applicant.cvLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View CV
                                    </a>
                                    <button
                                        className="ml-4 text-green-500 hover:text-green-700"
                                        onClick={() => handleContactApplicant(applicant.email)}
                                    >
                                        Contact Applicant
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No applicants yet.</p>
                        )}

                        <button
                            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                            onClick={() => handleDeleteJob(selectedJob.id)}
                        >
                            Delete Job
                        </button>
                    </div>
                )}

                {/* Add Job Page */}
                {currentPage === 'addJob' && (
                 
                        
                        <AddJob />
             
                )}

                {/* Profile Page */}
                {currentPage === 'profile' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                        <p>This is where your profile details will appear.</p>
                    </div>
                )}

                {/* Settings Page */}
                {currentPage === 'settings' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Settings</h1>
                        <p>Adjust your account settings here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
