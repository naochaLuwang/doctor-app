import nc from "next-connect";

import dbConnect from "../../../../utils/db";
import Chat from "../../../../models/Chat";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();
    const response = await Chat.findOne({ fromId: req.query.fromId });
    console.log(response.messages.length);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const {
      fromId,
      toId,
      firstName,
      lastName,
      lastChatDate,
      lastChatMessage,
      lastChatBy,
      messages,
      createdDate,
      lastChatDateTxt,
      lastChatTimeTxt,
    } = req.body;

    const newChat = new Chat({
      fromId,
      toId,
      firstName,
      lastName,
      lastChatDate,
      lastChatMessage,
      lastChatBy,
      messages,
      statusId: 1,
      tenantId: 1,
      isActive: "Y",
      createdDate,
      lastChatDateTxt,
      lastChatTimeTxt,
    });

    await newChat.save();
    return res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    await dbConnect();

    const {
      fromId,
      chats,
      lastChatDate,
      lastChatMessage,
      lastChatBy,
      lastChatDateTxt,
      lastChatTimeTxt,
    } = req.body;

    const response = await Chat.findOneAndUpdate(
      { fromId: fromId },
      {
        $push: { messages: chats, $sort: { createdDate: 1 } },
        lastChatDate: lastChatDate,
        lastChatMessage: lastChatMessage,
        lastChatBy: lastChatBy,
        lastChatDateTxt: lastChatDateTxt,
        lastChatTimeTxt: lastChatTimeTxt,
      },

      {
        new: true,
      }
    );

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
