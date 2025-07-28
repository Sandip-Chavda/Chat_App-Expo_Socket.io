import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name, avatar } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
      return;
    }

    user = new User({
      email,
      name,
      password,
      avatar: avatar || "",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.log("Error while Register User", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not exists with this email.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Password is incorrect, try agian.",
      });
      return;
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      message: "User loggedin successfully.",
    });
  } catch (error) {
    console.log("Error while Register User", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
