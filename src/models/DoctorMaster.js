import mongoose from "mongoose";

const doctorMasterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    tenantId: { type: Number },
    profileImageFlag: { type: String },
    profileImagePath: { type: String },
    profileImage: { type: String },
    bio: { type: String },
    websiteUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const DoctorMaster =
  mongoose.models.DoctorMaster ||
  mongoose.model("DoctorMaster", doctorMasterSchema);

export default DoctorMaster;
