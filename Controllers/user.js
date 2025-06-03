const User = require("../Models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Sign Up
exports.signUp = async (req, res) => {
  const { channelName, username, email, password, photo } = req.body;
 ;

  try {
    

    const isChannelName = await User.findOne({ channelName });
    if (isChannelName) {
      return res.status(400).json({ msg: "Channel name is already taken" });
    }

    const isUsername = await User.findOne({ username });
    if (isUsername) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ msg: "Email is already taken" });
    }

    const newUser = new User({
      channelName,
      username,
      email,
      password,
      photo,
    });

    const createdUser = await newUser.save();

    if (!createdUser) {
      return res.status(400).json({ msg: "User could not be created" });
    }

    return res
      .status(201)
      .json({ msg: "User save successfully", success: "Yes", data: createdUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Sign In
exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const isUser = await User.findOne({ username }).select("+password");
    if (!isUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(401).json({ msg: "Invalid credentials..." });
    }

    const token = jwt.sign({ user: isUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Remove password before sending user data
    const { password: pwd, ...safeUser } = isUser.toObject();

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ msg: "Login successful", token, user:safeUser });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Log Out
exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions); 
    return res.status(200).json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Logout failed" });
  }
};


