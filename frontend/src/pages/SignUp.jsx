import React, { useState } from 'react';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SuccessAndErrorPopup = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-4 right-4 bg-${type}-100 border-${type}-400 text-${type === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{type === 'success' ? 'Success!' : 'Error!'}</strong>
            <span className="block sm:inline px-5">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
                <svg className={`fill-current h-6 w-6 text-${type === 'success' ? 'green' : 'red'}-500`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.828 10l-3.176 3.176a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.172 10l3.176-3.176z" />
                </svg>
            </span>
        </div>
    );
};

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('jobSeeker');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        resume: '',
        skills: '',
        resumeFile: null,
        company: '',
        role: '',
        companyProofFile: null
    });

    const [popup, setPopup] = useState({ message: '', type: '', visible: false });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';

        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (role === 'employer' && !formData.company) {
            newErrors.company = 'Company is required';
        }
        setErrors(newErrors);
        setPopup({ message: "", type: 'error', visible: false });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('bio', formData.bio);

        if (role === 'employer') {
            data.append('company', formData.company);
            data.append('companyProofFile', formData.companyProofFile);
            data.append('role', 'employer');
        }

        if (role === 'jobSeeker') {
            data.append('resumeFile', formData.resumeFile);
            data.append('skills', formData.skills);
            data.append('role', 'jobSeeker');
        }

        try {
            const response = role === 'jobSeeker' ? await api.signUp(data) : await api.registerEmployer(data);
            console.log('Sign up response:', response);

            if (response.status === 201 || response.status === 200) {
                setPopup({ message: 'Sign up successful!', type: 'success', visible: true });
                setTimeout(() => {
                    setPopup({ ...popup, visible: false });
                    navigate('/login');
                }, 3000);
            } 


        } catch (err) {
            if (err.response && err.response.data.errors) {
                console.log('Validation errors:', err.response.data.errors);
                setPopup({ message: err.response.data.message.join(', '), type: 'error', visible: true });
            } else {
                console.error('Error:', err.response.data);
                setPopup({ message: err.response.data.message, type: 'error', visible: true });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {popup.visible && <SuccessAndErrorPopup message={popup.message} type={popup.type} onClose={() => setPopup({ ...popup, visible: false })} />}
                {step === 1 && (
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex justify-center mb-4">
                            <button
                                className={`flex items-center px-4 py-2 mr-2 ${role === 'jobSeeker' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setRole('jobSeeker')}
                            >
                                <FaUserGraduate className="mr-2" />
                                Job Seeker
                            </button>
                            <button
                                className={`flex items-center px-4 py-2 ${role === 'employer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setRole('employer')}
                            >
                                <FaUserTie className="mr-2" />
                                Employer
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">Select your role to proceed with the sign-up process.</p>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={() => setStep(2)}
                        >
                            Next
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between gap-5'>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="name" className="block text-gray-700 py-2">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-2 py-1 border rounded-sm"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                                    className="w-full px-3 py-1 border rounded-sm"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className="mb-4 w-1/2">
                                <label htmlFor="confirmPassword" className="block text-gray-700 py-2">Confirm password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-1 border rounded-sm"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {role === 'employer' && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="company" className="block text-gray-700 py-2">Company:</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border rounded-sm"
                                    />
                                    {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="companyProofFile" className="block text-gray-700 py-2">Upload Company Proof:</label>
                                    <input
                                        type="file"
                                        id="companyProofFile"
                                        name="companyProofFile"
                                        onChange={(e) => setFormData({ ...formData, companyProofFile: e.target.files[0] })}
                                        required
                                        className="w-full px-3 py-2 border rounded-sm"
                                    />
                                </div>
                            </>
                        )}

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

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sign Up</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;