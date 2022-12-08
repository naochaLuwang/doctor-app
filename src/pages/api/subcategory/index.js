import nc from "next-connect";
import dbConnect from "../../../utils/db";
import ArticleSubCategory from "../../../models/ArticleSubCategory";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const {
      articleCatId,
      articleCatName,
      tenantId,
      isActive,
      subCatCode,
      subCategoryName,
      createdBy,
      updatedBy,
    } = req.body;

    const subCategory = await ArticleSubCategory.findOne({
      tenantId: tenantId,
      subCategoryName: subCategoryName,
    });

    if (subCategory) {
      return res.status(200).json(subCategory);
    }

    if (!subCategory) {
      const newSubCategory = await new ArticleSubCategory({
        articleCatId,
        tenantId,
        isActive,
        subCatCode,
        subCategoryName,
        articleCatName,
        createdBy,
        updatedBy,
      });

      await newSubCategory.save();
      res.status(200).json(newSubCategory);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default handler;
