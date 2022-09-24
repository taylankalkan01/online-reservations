import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import loginValidationSchema from "../../validations/loginValidationSchema.js";
import jwt from "jsonwebtoken";
import generateTokens from "../../helpers/tokens/generateTokens.js";

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidationSchema(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ error: true, message: "Email or Password is wrong" });

    //checking if the password is correct
    const verifiedPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!verifiedPassword)
      return res
        .status(400)
        .json({ error: true, message: "Email or Password is wrong" });

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in successfully"
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { loginUser };
