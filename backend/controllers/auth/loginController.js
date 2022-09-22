import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import loginValidationSchema from "../../validations/loginValidationSchema.js";


const loginUser = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validateAsync(sanitize(req.body));

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email or Password is wrong");

    //checking if the password is correct
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).json("Email or Password is wrong");

    const { password, ...others } = sanitize(user._doc);
    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).send(error);
  }
};



export default { loginUser };
