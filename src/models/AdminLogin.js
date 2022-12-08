import mongoose from "mongoose";

const adminLoginSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      required: true,
    },
    tenantId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminLogin =
  mongoose.models.AdminLogin || mongoose.model("AdminLogin", adminLoginSchema);

module.exports = AdminLogin;
