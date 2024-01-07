import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faLocationPin } from '@fortawesome/free-solid-svg-icons';

const JobDetail = () => {
    const { job_id } = useParams(); // Get the job ID from the URL
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        resume: null,
        coverLetter: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Application submitted:', formData);
        alert('Your application has been submitted!');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            {/* Job Details */}
            <div className=' mb-7'>
                <div className='flex justify-between items-center mb-4'>
            <h1 className="text-xl font-bold mb-4">Job Title (Job ID: {job_id})</h1>
            <p className='text-sm'>Posted: Dec 16, 2024</p>
            </div>
            <p className="text-gray-700 mb-2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, neque quaerat repellat consequatur deleniti ex a eius et quod. Ab, sapiente facere assumenda excepturi pariatur neque deleniti doloremque et aut commodi voluptatibus ex hic, architecto explicabo voluptatum cupiditate distinctio. Neque sint earum similique quod eaque architecto fugit sapiente repellendus recusandae.
            </p>

            skills: <span className="text-blue-500">React, Node.js, Express</span>

            </div>
            <div className='flex justify-between items-center'>
            <p className="text-gray-700 mb-4">
                <strong>Experience Level:</strong> Entry Level <br />
                <strong>Salary:</strong> $40,000 <br />
                <strong>Job Type:</strong> Full Time <br />
            </p>
             <p>

                <FontAwesomeIcon icon={faLocationPin} className="mr-2 text-red-500" />
               
                <strong>Location:</strong> Addis Ababa
            </p>
            </div>

            <hr className="my-6" />

            {/* Job Application Form */}
            <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               
                {/* Resume Upload */}
            

                {/* Cover Letter */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="coverLetter">
                        Cover Letter
                    </label>
                    <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a brief cover letter..."
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className='flex justify-end'>
                    {/* <button
                        type="cancel"
                        className="w-1/3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                       Cancel
                    </button> */}
                    <button
                        type="submit"
                        className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobDetail;
