import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["jobSeeker", "employer", "admin"], required: true },
  createdAt: { type: Date, default: Date.now },
  profile: {
    bio: { type: String },
    resume: { type: String }, // URL to uploaded resume
    skills: [{ type: String }],
    company: { type: String }, // Company name for employers
    companyProof: { type: String }, // URL to uploaded company proof
    status: { type: String } // Status for employers
  },
});

export default model("User", userSchema);
