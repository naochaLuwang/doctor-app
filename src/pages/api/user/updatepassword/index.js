import nc from "next-connect";

const handler = nc();

handler.put(async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default handler;
