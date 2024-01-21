import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import './index.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetail';
import AddJob from './pages/AddJob';
import EmployerJobs from './pages/EmployerJobs';

const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/employer/jobs" element={<EmployerJobs />} />
        
      </Routes>
    </div>
  );
};

export default App;
