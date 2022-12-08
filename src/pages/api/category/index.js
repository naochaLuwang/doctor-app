import nc from "next-connect";
import dbConnect from "../../../utils/db";
import ArticleCategory from "../../../models/ArticleCategory";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const {
      tenantId,
      isActive,

      catCode,
      categoryName,
      createdBy,
      updatedBy,
    } = req.body;

    const categories = await ArticleCategory.find({ tenantId: tenantId });

    const catId = categories.length + 1;

    const category = await ArticleCategory.findOne({
      tenantId: tenantId,
      categoryName: categoryName,
    });

    if (category) {
      return res.status(200).json(category);
    }

    if (!category) {
      const newCategory = await new ArticleCategory({
        articleCatId: catId,
        tenantId,
        isActive,
        catCode,
        categoryName,
        createdBy,
        updatedBy,
      });

      await newCategory.save();
      res.status(200).json(newCategory);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

handler.get(async (req, res) => {
  const categories = await ArticleCategory.find();
  res.status(200).json(categories);
});

export default handler;
