import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import transporter from "../config/nodeMailer.js";
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    const hassPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hassPass,
      role,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to My Restaurant",
      text: `Welcome to my website. Your account has been created with email id: ${email}`,
      //   html: WELCOME_MESSAGE.replace("{{email}}", user.email),
    };

    await transporter.sendMail(mailOptions);
    return res.status(201).json({
      message: "Created and Saved Successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("Error in registering a User", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please Enter both Fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({ message: "User Unauthorized or Invalid" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "User found and return successfully",
      user: user,
      token,
    });
  } catch (error) {
    console.log("Error : ", error);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie();
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error : ", error);
  }
};
