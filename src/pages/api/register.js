import nc from "next-connect";
import dbConnect from "../../utils/db";
import AdminLogin from "../../models/AdminLogin";
import DoctorMaster from "../../models/DoctorMaster";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const { userName, password, tenantId, firstName, lastName, email } =
      req.body;

    const user = await AdminLogin.findOne({ userName: userName });

    if (user) {
      throw new Error("Please use another username");
    }

    const adminId = uuid();
    const userId = uuid();

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await new AdminLogin({
      adminId,
      userName,
      password: hashedPassword,
      isActive: "Y",
      tenantId,
      userId,
    });

    await newAdmin.save();

    const newUser = await new DoctorMaster({
      userId,
      userName,
      firstName,
      lastName,
      email,
      tenantId,
    });

    await newUser.save();
    res.status(200).json(newAdmin, newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default handler;
