import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  fromId: {
    type: Number,
  },
  toId: {
    type: Number,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  lastChatDate: {
    type: Date,
  },
  lastChatMessage: {
    type: String,
  },
  lastChatBy: {
    type: String,
  },
  statusId: {
    type: Number,
  },
  Custom_1: {
    type: String,
  },

  messages: [
    {
      typeId: {
        type: Number,
      },
      regId: {
        type: String,
      },
      firstName: { type: String },
      lastName: { type: String },
      msg: { type: String },

      statusId: { type: Number },
      createdDate: { type: Date },
      createdBy: { type: String },
    },
  ],

  tenantId: {
    type: Number,
  },
  isActive: {
    type: String,
  },
  createdDate: { type: Date },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

module.exports = Chat;
