import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    articleId: {
      type: String,
    },
    tenantId: {
      type: Number,
    },
    articleCatId: {
      type: Number,
    },
    articleCatName: {
      type: String,
    },
    articleSubCatId: {
      type: String,
    },
    articleSubCatName: {
      type: String,
    },
    articleTitle: {
      type: String,
    },
    articleSubtitle: {
      type: String,
    },
    articleContent: {
      type: String,
    },
    articleContentJson: {
      type: Array,
    },
    statusId: {
      type: Number,
    },
    isPublished: {
      type: String,
    },
    publishedDate: {
      type: Date,
    },
    publishedBy: {
      type: String,
    },
    imageFlag: {
      type: String,
    },

    imageUrl: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    likedCount: {
      type: Number,
    },
    isActive: {
      type: String,
    },
    likesArray: [
      {
        regId: {
          type: Number,
        },
        firstName: { type: String },
        lastName: { type: String },
        genderCode: { type: String },
        imageUrl: { type: String },
        longitude: { type: String },
        latitude: { type: String },
        address: { type: String },
        statusId: { type: Number },
        statusName: { type: String },
        custom1: { type: String },
        custom2: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        tenantId: { type: Number },
        isActive: { type: String },
      },
    ],

    viewedCount: {
      type: Number,
    },
    viewedArray: [
      {
        regId: {
          type: Number,
        },
        firstName: { type: String },
        lastName: { type: String },
        genderCode: { type: String },
        imageUrl: { type: String },
        longitude: { type: String },
        latitude: { type: String },
        address: { type: String },
        statusId: { type: Number },
        statusName: { type: String },
        custom1: { type: String },
        custom2: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        tenantId: { type: Number },
        isActive: { type: String },
      },
    ],
    commentsArray: [
      {
        regId: {
          type: Number,
        },
        firstName: { type: String },
        lastName: { type: String },
        genderCode: { type: String },
        imageUrl: { type: String },
        longitude: { type: String },
        latitude: { type: String },
        address: { type: String },
        statusId: { type: Number },
        statusName: { type: String },
        comment: { type: String },
        custom1: { type: String },

        custom2: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        tenantId: { type: Number },
        isActive: { type: String },
      },
    ],

    reportArray: [
      {
        regId: {
          type: Number,
        },
        firstName: { type: String },
        lastName: { type: String },
        genderCode: { type: String },
        imageUrl: { type: String },
        longitude: { type: String },
        latitude: { type: String },
        address: { type: String },
        statusId: { type: Number },
        statusName: { type: String },
        report: { type: String },
        custom1: { type: String },

        custom2: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
        tenantId: { type: Number },
        isActive: { type: String },
      },
    ],

    favourite: [
      {
        regID: { type: Number },
        createdDate: { type: Date },
      },
    ],

    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

module.exports = Article;
