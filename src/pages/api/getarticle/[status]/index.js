import nc from "next-connect";
import dbConnect from "../../../../utils/db";
// import ArticleFrom

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();

    const response = await Article;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
