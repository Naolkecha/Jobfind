import multer from 'multer';
import path from 'path';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
const { genSalt, hash, compare } = bcrypt;
import { validationResult } from 'express-validator';
import generateToken from '../utils/tokenGenerator.js';
import formidable from 'formidable';


// Set up multer storage and file filtering
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/resumes'); // Store uploaded resumes in 'uploads/resumes' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename with timestamp
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
};

// Initialize multer upload middleware
const upload = multer({ storage, fileFilter });

const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, bio, skills } = req.body;
    const resumeFile = req.file; // The resume file will be available in req.file after upload

    // Check if resume file is uploaded
    if (!resumeFile) {
        return res.status(400).json({ msg: 'Resume is required' });
    }

    // Check for missing required fields (excluding resume, as it's handled by multer)
    if (!bio || !skills || skills.length === 0) {
        return res.status(400).json({ msg: 'Bio and skills are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            name,
            email,
            password,
            role,
            profile: {
                bio,
                resume: `/uploads/resumes/${resumeFile.filename}`, // Store the relative path of the uploaded resume
                skills: skills // Parse skills from JSON string to array
            }
        });

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();

        // Generate the token
        const token = generateToken(user);

        return res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Placeholder function for company verification
const verifyCompany = async (company) => {
    // Check if the company is verified by an admin
   

    
};


const uploadCompanyProof = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/companyProofs'); // Store uploaded company proofs in 'uploads/companyProofs' folder
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename with timestamp
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
        }
    }
});

const registerEmployer = async (req, res) => {
    const { name, email, password, role, company, bio } = req.body;
    const companyProofFile = req.file; // The company proof file will be available in req.file after upload

    let status = 'pending'; // Add status as pending at the start

    // Check for missing required fields
    if (!company) {
        return res.status(400).json({ message: 'Company is required' });
    }

    // Check if company proof file is uploaded
    if (!companyProofFile) {
        return res.status(400).json({ msg: 'Company proof is required' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            
            return res.status(400).json({ message: 'User already exists' });
        }

        
        user = new User({
            name,
            email,
            password,
            role,
            profile: {
                company,
                bio,
                companyProof: `/uploads/companyProofs/${companyProofFile.filename}`, // Store the relative path of the uploaded company proof
                status // Add status to the profile
            }
        });

        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        await user.save();

        // Generate the token
        const token = generateToken(user);

        return res.status(201).json({ token });


    } catch (err) {
        
        res.status(500).send('Server Error');

        return res.status(500).json({ message: 'Server Error' });
    }
};



const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ msg: 'Error parsing form data' });
        }
        
        let { email, password } = fields;

        console.log('Email:', email[0]);

        email = email[0].toLowerCase();
        password = password[0];
        

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }


            const isMatch = await compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
            // Generate the token
            const token = generateToken(user);
            return res.json({ token, role: user.role });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

export default {
    upload,
    uploadCompanyProof,
    register,
    registerEmployer,
    login
};


