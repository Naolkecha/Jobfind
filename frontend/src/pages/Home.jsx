import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Home = () => {


    return (
        <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZpbmQlMjBqb2IlMjB0ZWFtfGVufDB8fDB8fHww')" }}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-lg flex w-full max-w-screen-md gap-3">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="remote">Remote</option>
                    </select>
                    <button className='bg-blue-500 px-4 py-2 text-white rounded'> Search</button>
                </div>
            </div>
        </div>
    );
};

export default Home;