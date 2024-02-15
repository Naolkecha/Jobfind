// routes/jobRoutes.js

import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createJob, getJobs, getJobById, updateJob, deleteJob, getJobByUser } from '../controller/JobController.js';

const router = express.Router();

router.route('/').post(protect, createJob).get(getJobs);
router.route('/:id').get(getJobById).put(protect, updateJob).delete(protect, deleteJob);
router.route('/').get(protect, getJobByUser);

export default router;
// In the jobRoutes.js file, we have defined the routes for creating, getting, updating, and deleting jobs. We have used the protect middleware to protect the routes that require authentication. The createJob, getJobs, getJobById, updateJob, and deleteJob controller functions are imported from the jobController.js file and assigned to the corresponding routes using the router.route() method.

