import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import registerValidationSchema from "../../validations/registerValidationSchema.js";
const registerUser = async (req, res) => {
  try {
    const { error } = registerValidationSchema(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).json({
        error: true,
        message: "You cannot register, email already exist"
      });

    const phoneNumberExist = await User.findOne({
      phoneNumber: req.body.phoneNumberExist
    });

    if (phoneNumberExist) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Phone Number already exist"
      });
    }

    const hashedPass = await bcrypt.hashSync(req.body.password, 10);

    await new User({ ...req.body, password: hashedPass }).save();

    res.status(201).json({
      error: false,
      message: "Account created sucessfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
export default { registerUser };
