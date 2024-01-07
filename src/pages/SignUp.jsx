import React, { useState } from 'react';
import api from '../services/api';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobSeeker',
        bio: '',
        resume: '',
        skills: '',
        resumeFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [errors, setErrors] = useState([]);

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    data.append('bio', formData.bio);
    data.append('skills', formData.skills);
    data.append('resumeFile', formData.resumeFile);

    try {
        const response = await api.signUp(data);
        console.log('User signed up:', response);
    } catch (err) {
        if (err.response && err.response.data.errors) {
            console.log('Validation errors:', err.response.data.errors);
            setErrors(err.response.data.errors); // Capture validation errors
        } else {
            console.error('Error:', err);
            console.log('An error occurred:', err.message);
        }
    }
};

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center ">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex justify-between gap-5'>
                    <div className="mb-4 w-1/2 ">
                        <label htmlFor="name" className="block text-gray-700 py-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-2 py-1 border rounded-sm"
                        />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label htmlFor="email" className="block text-gray-700 py-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border rounded-sm "
                        />
                    </div>
                    </div>

                    <div className='flex justify-between gap-5'>
                    <div className="mb-4 w-1/2">
                        <label htmlFor="password" className="block text-gray-700 py-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border rounded-sm"
                        />
                    </div>
                    <div className="mb-4 w-1/2">
                        <label htmlFor="password" className="block text-gray-700 py-2">Confirm password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border rounded-sm"
                        />
                    </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-gray-700">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            placeholder='Tell us about yourself'
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="skills" className="block text-gray-700">Skills (comma separated):</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            placeholder='e.g. HTML, CSS, JavaScript'
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                  
                    <div className="mb-4">
                        <label htmlFor="resume" className="block text-gray-700">Upload Resume:</label>
                        <input
                            type="file"
                            id="resumeFile"
                            name="resume"
                            onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files[0] })}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                  
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;