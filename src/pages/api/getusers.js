import nc from "next-connect";
import Registration from "../../models/Regsitration";

const handler = nc();

handler.get(async (req, res) => {
  const response = await Registration.find({ tenantId: 1 });
  res.status(200).json(response);
});

export default handler;
