import nc from "next-connect";
import dbConnect from "../../../utils/db";
import Chat from "../../../models/Chat";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();

    const response = await Chat.find({ tenantId: 1, isActive: "Y" }).sort({
      lastChatDate: -1,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default handler;
