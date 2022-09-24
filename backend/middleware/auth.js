import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(403)
      .json({ error: true, message: "Access denied: No token provived" });
  }
  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
    );
    req.user = tokenDetails;
    next();
  } catch (error) {
    console.log(error);
    console.log(error.message)
    res
      .status(403)
      .json({ error: true, message: "Access Denied: Invalid Token" });
  }
};

export default auth;
