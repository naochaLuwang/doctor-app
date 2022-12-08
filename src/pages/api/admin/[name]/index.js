import nc from "next-connect";
import DoctorMaster from "../../../../models/DoctorMaster";
import dbConnect from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await dbConnect();
    const user = await DoctorMaster.findOne({ username: req.query.name });

    if (!user) {
      return null;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default handler;
