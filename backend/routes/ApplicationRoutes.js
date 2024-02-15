import { Router } from "express";
import { applyForJob, getApplicationsForJob, getApplicationById, getApplicationsForUser, removeApplication } from "../controller/ApplicationController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Middleware to protect routes

const router = Router();

// Apply for a job
router.post("/:jobId", protect, applyForJob);

// Get all applications for a specific job
router.get("/:jobId/applications", protect, getApplicationsForJob);

// remove application from job
router.delete("/:applicationId", protect, removeApplication);

// Get all applications for a user
router.get("/applications", protect, getApplicationsForUser);

// Get a specific application by ID
router.get("/application/:applicationId", protect, getApplicationById);

export default router;
