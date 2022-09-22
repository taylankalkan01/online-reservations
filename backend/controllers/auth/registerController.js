import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import registerValidationSchema from "../../validations/registerValidationSchema.js";

const registerUser = async (req, res) => {
  try {
    const { error } = registerValidationSchema.validateAsync(
      sanitize(req.body)
    );

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send("You cannot register, email already exist");

    const hashedPass = await bcrypt.hashSync(req.body.password, 10);

    const { firstName, userName, phoneNumber, dateOfBirth, lastName, email } =
      sanitize(req.body);

    const newUser = new User({
      firstName,
      userName,
      lastName,
      email,
      password: hashedPass,
      phoneNumber,
      dateOfBirth
    });

    const user = await newUser.save();
    res.status(201).json({ message: "User Created", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export default { registerUser };
