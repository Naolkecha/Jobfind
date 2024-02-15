import React, { useState, useContext } from 'react';
import api from '../services/api';
import UserContext from '../context/userContext';

const Login = () => {
   

    const [formData, setFormData] = useState({
        email: '',
        password: '',
       
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

    console.log('Form data:', formData);

    const data = new FormData();
  
    data.append('email', formData.email);
    data.append('password', formData.password);


    try {
        const response = await api.login(data);
        
       if (response.token) {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);

            if (response.role === 'jobSeeker') {
                window.location = '/jobs';
            }
            if (response.role === 'employer') {
                window.location = '/employer/jobs';
            }

            
        } else {
            console.log('Login failed:', response);
        }
        
        

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 md:px-10">
            <div className="bg-white h-full p-10 rounded-lg shadow-md mx-10 md:w-1/3 md:max-w-xl ">
                <h2 className="text-3xl font-bold mb-6 text-center py-3 ">Login</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                  
                   
                    <div className="mb-4 flex gap-3 w-full">
                        {/* <label htmlFor="email" className="block text-gray-700 py-2">Email:</label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-sm "
                        />
                    </div>
                 

                   
                    <div className="mb-4 flex w-full items-center gap-2">
                        {/* <label htmlFor="password" className="block text-gray-700 ">Password:</label> */}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-sm "
                        />
                    </div>
                 
                  
                  
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>

                    <div className='flex gap-2 text-sm'><p>Forgot password?</p><a href="/reset_password" className='text-blue-500'>Reset</a></div>
                    <div className='flex gap-2 text-sm'><p>Don't have an account?</p><a href="/signup" className='text-blue-500'>Sign up</a></div>
                </form>
            </div>
        </div>
    );
};

export default Login;