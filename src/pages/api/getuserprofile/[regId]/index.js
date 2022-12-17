import nc from "next-connect";
import dbConnect from "../../../../utils/db";
import Registration from "../../../../models/Regsitration";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();

    const id = req.query.regId;

    const response = await Registration.findOne({
      RegID: id,
    });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
