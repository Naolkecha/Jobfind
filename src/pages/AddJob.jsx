import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        employmentType: '',
        minSalary: '',
        maxSalary: '',
        skillsRequired: [],
        newSkill: '', // for handling new skill input
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleAddSkill = () => {
        if (jobDetails.newSkill && !jobDetails.skillsRequired.includes(jobDetails.newSkill)) {
            setJobDetails((prevDetails) => ({
                ...prevDetails,
                skillsRequired: [...prevDetails.skillsRequired, prevDetails.newSkill],
                newSkill: '', // clear the input field after adding
            }));
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            skillsRequired: prevDetails.skillsRequired.filter(skill => skill !== skillToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/jobs', jobDetails);
            console.log('Job added:', response.data);
            alert('Job added successfully!');
            setJobDetails({
                title: '',
                description: '',
                company: '',
                location: '',
                employmentType: '',
                minSalary: '',
                maxSalary: '',
                skillsRequired: [],
                newSkill: '', // reset after submission
            });
        } catch (error) {
            console.error('Error adding job:', error);
            alert('Failed to add job.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  p-4 bg-gra">
            <div className="bg-white p-6 rounded w-full ">
                <h2 className="text-2xl text-center font-bold mb-6">Post Job</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={jobDetails.title}
                            onChange={handleChange}
                            placeholder="Job Title"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="company"
                            value={jobDetails.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='col-span-2'>
                        <textarea
                            name="description"
                            value={jobDetails.description}
                            onChange={handleChange}
                            placeholder="Job Description"
                            required
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="flex flex-wrap gap-2">
                            {jobDetails.skillsRequired.map((skill, index) => (
                                <span key={index} className="flex items-center px-4 py-2 text-sm bg-gray-200 rounded-full">
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="ml-2 text-red-500"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex mt-2">
                            <input
                                type="text"
                                name="newSkill"
                                value={jobDetails.newSkill}
                                onChange={handleChange}
                                placeholder="Add a skill"
                                className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="location"
                            value={jobDetails.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <select
                            name="employmentType"
                            value={jobDetails.employmentType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Employment Type</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="minSalary"
                            value={jobDetails.minSalary}
                            onChange={handleChange}
                            placeholder="Minimum Salary"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className='pb-6'> 
                        <input
                            type="number"
                            name="maxSalary"
                            value={jobDetails.maxSalary}
                            onChange={handleChange}
                            placeholder="Maximum Salary"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-1/3"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
