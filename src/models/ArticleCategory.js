import mongoose from "mongoose";

const articleCategorySchema = new mongoose.Schema(
  {
    articleCatId: {
      type: Number,
    },
    tenantId: {
      type: Number,
    },
    isActive: {
      type: String,
    },
    catCode: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    iconFlag: {
      type: String,
    },
    iconFilePath: {
      type: String,
    },
    iconFile: {
      type: String,
    },
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

const ArticleCategory =
  mongoose.models.ArticleCategory ||
  mongoose.model("ArticleCategory", articleCategorySchema);
module.exports = ArticleCategory;
