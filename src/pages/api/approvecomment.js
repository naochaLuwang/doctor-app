import nc from "next-connect";
import Article from "../../models/Article";

import dbConnect from "../../utils/db";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const { id, cid } = req.body;

    const response = await Article.findOneAndUpdate(
      {
        _id: id,
        "commentsArray._id": cid,
      },
      {
        $set: {
          "commentsArray.$.statusId": 1,
          "commentsArray.$.statusName": "PUBLISHED",
        },
      },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default handler;
