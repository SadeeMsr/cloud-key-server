import prisma from "../Config/db.config.js";


export const createUserKeys = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: req.body,
    });
    res.json({ success: true, user: newUser, msg: "New user created!" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};


export const getUserKeysByUname = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        u_name: req.params.u_name,
      }
    });
    return res.json({
      status: 200,
      data: user || [],
      ok: user ? true : false,
    });

  } catch (error) {
    res
      .status(500)
      .json({ ok: false, error, msg: "User Not Found!" });
  }
};


export const getUserKeysByUID = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: req.params.uid,
      }
    });
    return res.json({
      status: 200,
      data: user || [],
      ok: user ? true : false,
    });

  } catch (error) {
    res
      .status(500)
      .json({ ok: false, error, msg: "User Not Found!" });
  }
};