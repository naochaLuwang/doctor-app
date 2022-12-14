import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    RegUid: {
      type: String,
    },
    RegId: {
      type: Number,
    },
    isActive: {
      type: String,
    },
    TenantId: {
      type: Number,
    },
    TokenNo: {
      type: Number,
    },
    UHIDFlag: { type: String },
    UHID: { type: String },
    HIELinked: { type: String },
    FirstName: { type: String },
    LastName: { type: String },
    Dob: { type: String },
    Dob_date: {
      type: Date,
    },
    GenderCode: {
      type: String,
    },
    Gender: {
      type: String,
    },
    CountryID: { type: Number },
    CountryName: { type: String },
    CityId: { type: Number },
    CityName: { type: String },
    StateId: { type: Number },
    StateName: { type: String },
    Email: { type: String },
    Password: { type: String },
    PrimaryMobileNo: { type: String },
    Status: { type: String },
    StatusId: { type: Number },
    Longitude: { type: String },
    Latitude: { type: String },
    FullAddress: { type: String },
    Custom_1: { type: String },
    Custom_2: { type: String },
    Custom_3: { type: String },
    Custom_4: { type: String },
    Custom_5: { type: String },
    Custom_6: { type: String },
    Custom_7: { type: String },
    Custom_8: { type: String },
    Custom_9: { type: String },
    Custom_10: { type: String },
    CreatedDate: { type: Date },
    UpdatedDate: { type: Date },
    CreatedBy: { type: String },
    UpdatedBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

module.exports = Registration;
