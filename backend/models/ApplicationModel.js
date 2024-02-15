import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String },
  resume: { type: String }, // URL to uploaded resume
  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected", "accepted"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

export default model("Application", applicationSchema);
