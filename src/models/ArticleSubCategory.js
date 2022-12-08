import mongoose from "mongoose";

const articleSubCategorySchema = new mongoose.Schema(
  {
    articleCatId: {
      type: Number,
    },
    articleCatName: {
      type: String,
    },
    tenantId: {
      type: Number,
    },
    isActive: {
      type: String,
    },
    subCatCode: {
      type: String,
    },
    subCategoryName: {
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
    createdBY: {
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

const ArticleSubCategory =
  mongoose.models.ArticleSubCategory ||
  mongoose.model("ArticleSubCategory", articleSubCategorySchema);
module.exports = ArticleSubCategory;
