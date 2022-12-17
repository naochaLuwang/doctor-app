import nc from "next-connect";
import dbConnect from "../../../utils/db";
import Article from "../../../models/Article";
const { uuid } = require("uuidv4");

const handler = nc();

handler.put(async (req, res) => {
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

      tags,
    } = req.body;

    const response = await Article.findOneAndUpdate(
      {
        articleId,
        tenantId,
      },
      {
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
        imageUrl,
        imageFlag,
        publishedBy,
        likedCount,
        createdBy,
        updatedBy,

        tags,
      },
      {
        new: true,
      }
    );

    res.status(200).json(response);
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
