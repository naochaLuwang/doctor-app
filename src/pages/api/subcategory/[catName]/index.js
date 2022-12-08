import nc from "next-connect";
import dbConnect from "../../../../utils/db";
import ArticleSubCategory from "../../../../models/ArticleSubCategory";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();

    const response = await ArticleSubCategory.find({
      articleCatName: req.query.catName,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
