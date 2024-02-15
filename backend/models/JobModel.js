import { Schema, model, mongoose } from "mongoose";

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, enum: ["full-time", "part-time", "contract"], required: true },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    
  },
  skillsRequired: [{ type: String }], // List of skills
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  applications: [
    {
      applicant: { type: Schema.Types.ObjectId, ref: "User" },
      coverLetter: { type: String },
      resume: { type: String }, // URL to uploaded resume
      appliedAt: { type: Date, default: Date.now },
    },
  ],
});

export default model("Job", jobSchema);
