import nc from "next-connect";
import Chat from "../../../models/Chat";

const handler = nc();

handler.put(async (req, res) => {
  const { chatId, readDate, messageId } = req.body;
  const response = await Chat.findOneAndUpdate(
    {
      fromId: chatId,

      "messages._id": messageId,
    },
    {
      $set: {
        "messages.$.isRead": "Y",
        "messages.$.readDate": readDate,
      },
    }
  );

  res.status(200).json(response);
});

export default handler;
