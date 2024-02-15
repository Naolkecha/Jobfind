import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  permissions: [{ type: String }], // List of permissions
  createdAt: { type: Date, default: Date.now },
});

export default model("Admin", adminSchema);
