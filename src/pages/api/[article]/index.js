import nc from "next-connect";
import dbConnect from "../../../utils/db";
import Article from "../../../models/Article";
const { uuid } = require("uuidv4");

const handler = nc();

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const {
      articleId,
      tenantId,
      articleCatId,
      articleCatName,
      articleSubCatId,
      articleSubCatName,
      articleTitle,
      articleSubtitle,
      articleContent,
      articleContentJson,
      statusId,
      isPublished,
      publishedDate,
      imageFlag,
      imageUrl,
      publishedBy,
      likedCount,
      createdBy,
      updatedBy,
      likesArray,
      viewedArray,
      commentArray,
      reportArray,
      tags,
    } = req.body;

    const newArticle = await new Article({
      articleId,
      tenantId,
      articleCatId,
      articleCatName,
      articleSubCatId,
      articleSubCatName,
      articleTitle,
      articleSubtitle,
      articleContent,
      articleContentJson,
      statusId,
      isPublished,
      publishedDate,
      imageFlag,
      imageUrl,

      publishedBy,
      likedCount,
      createdBy,
      updatedBy,
      likesArray,
      viewedArray,
      commentsArray: commentArray,
      reportArray,
      isActive: "Y",
      tags,
    });

    await newArticle.save();
    return res.status(200).json(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

handler.get(async (req, res) => {
  try {
    // console.log(req.query.tenantId, req.query.userName);
    const articles = await Article.find({
      tenantId: 1,
      createdBy: "admin",
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default handler;
