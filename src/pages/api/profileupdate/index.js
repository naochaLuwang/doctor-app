import nc from "next-connect";

import dbConnect from "../../../utils/db";
import DoctorMaster from "../../../models/DoctorMaster";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const {
      userId,
      tenantId,
      firstName,
      lastName,
      title,
      bio,
      userImageFileName,

      webUrl,
    } = req.body;

    console.log(userId, tenantId, firstName, lastName, title);
    const respnse = await DoctorMaster.findOneAndUpdate(
      {
        userId,
        tenantId,
      },
      {
        firstName,
        lastName,
        title,
        bio,

        profileImage: userImageFileName,
        websiteUrl: webUrl,
      },
      {
        new: true,
      }
    );

    res.json(respnse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
