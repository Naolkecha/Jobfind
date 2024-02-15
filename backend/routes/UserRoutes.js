import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import UserController from '../controller/UserController.js';
// import { upload } from '../controller/authController.js'; // Assuming upload is exported from authController.js

const { register, login, upload, registerEmployer, uploadCompanyProof } = UserController;

router.post('/register', upload.single('resumeFile'), register); // Use upload.single('resume') for resume file upload

router.post('/register-employer',uploadCompanyProof.single('companyProofFile'), registerEmployer);

router.post('/login', login);

export default router;
