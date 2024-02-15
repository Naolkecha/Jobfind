import Application from "../models/ApplicationModel.js";
import Job from "../models/JobModel.js";

// Apply for a job
const applyForJob = async (req, res) => {
    const { jobId } = req.params;
    const { coverLetter } = req.body;

    try {
        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the user has already applied for this job
        // const existingApplication = await Application.findOne({ job: jobId, applicant: req.user.id });
        // if (existingApplication) {
        //     return res.status(400).json({ message: "You have already applied for this job" });
        // }

        // Create a new application
        const application = new Application({
            job: jobId,
            applicant: req.user.id, // Assuming the user is attached to req.user by middleware
            coverLetter
        });

        // Save the application
        await application.save();

        // Add the application to the job's applications array
        job.applications.push(application._id);
        await job.save();

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Error applying for job", error: error.message });
    }
};

// Get all applications for a job
const getApplicationsForJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        // Find all applications for the specific job
        const applications = await Application.find({ job: jobId }).populate('applicant', 'name email');

        if (!applications) {
            return res.status(404).json({ message: "No applications found for this job" });
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications", error: error.message });
    }
};

// Get an application by ID
const getApplicationById = async (req, res) => {
    try {
        // Find the application by its ID
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: "Error fetching application", error: error.message });
    }
};

const getApplicationsForUser = async (req, res) => {
    try {
        // Find all applications for the specific user
        const applications = await Application.find({ applicant: req.user.id }).populate('job', 'title');

        if (!applications) {
            return res.status(404).json({ message: "No applications found for this user" });
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications", error: error.message });
    }
}

// user his own remove application
const removeApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.applicant.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        // Remove the application from the job's applications array
        const job = await Job.findById(application.job);
        if (job) {
            job.applications.pull(application._id);
            await job.save();
        }

        await application.deleteOne();
        res.status(200).json({ message: "Application removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing application", error: error.message });
    }
}

export { applyForJob, getApplicationsForJob, getApplicationById, removeApplication, getApplicationsForUser };
