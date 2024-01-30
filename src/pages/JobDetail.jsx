import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PopUp  = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Application Submitted</h2>
                <p>Your application has been submitted successfully.</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4" onClick={() => navigate('/jobs')}>Close</button>
            </div>
        </div>
    );
};



const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.getJob(id);
                setJob(response);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };

        fetchJob();
    }, [id]);


    console.log('Job:', job);


    const [formData, setFormData] = useState({
        coverLetter: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // const handleFileChange = (e) => {
    //     setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('coverLetter', formData.coverLetter);

            const response = await api.applyJob(id, data);

            if (response.status === 201) {
                
                setShowPopUp(true);
            }


        } catch (error) {
            console.error('Error submitting application:', error);
        }
        
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            {job && (
                <>
                    <div className='mb-7'>
                        <div className='flex justify-between items-center mb-4'>
                            <h1 className="text-xl font-bold mb-4">Job Title: {job?.title}</h1>
                            <p className='text-sm'>Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                        <p className="text-gray-700 mb-2">{job.description}</p>
                        <p>Skills: <span className="text-blue-500">{job.skillsRequired.join(', ')}</span></p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-gray-700 mb-4">
                            <strong>Experience Level:</strong> Entry Level <br />
                            <strong>Salary:</strong> ${job.salaryRange.min} - ${job.salaryRange.max} <br />
                            <strong>Job Type:</strong> {job.employmentType} <br />
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faLocationPin} className="mr-2 text-red-500" />
                            <strong>Location:</strong> {job.location}
                        </p>
                    </div>
                    <hr className="my-6" />
                    <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>

                    {showPopUp && <PopUp />}
                </>
            )}
        </div>
    );
};


export default JobDetail;