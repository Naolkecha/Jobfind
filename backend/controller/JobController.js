import c from "config";
import Job from "../models/JobModel.js";
import mongoose from "mongoose"; 

// Create a new job
export const createJob = async (req, res) => {
  const { title, description, company, location, employmentType, minSalary, maxSalary, skillsRequired } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      location,
      employmentType,
      salaryRange: { min: minSalary, max: maxSalary },
      skillsRequired,
      postedBy: req.user.id, // Use logged-in user's ID
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Get a job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    console.log('req.params.jobId', req.params.id);
    console.log('job', job);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId); // Correct model reference
    if (!job || job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    Object.assign(job, req.body); // Update job fields with request body
    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId); // Correct model reference
    if (!job || job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await job.remove();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

export const getJobByUser = async (req, res) => {
  console.log('Fetching jobs for user');
  try {
    // Ensure that req.user.id is a valid ObjectId before using it in the query
    const userId = mongoose.Types.ObjectId(req.user.id);
   

    // Query to find jobs by the user who posted them
    const jobs = await Job.find({ postedBy: userId });
    console.log('userId', jobs);
    
    // If jobs are found, send them in the response
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    // Send an error message if something goes wrong
    return res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};