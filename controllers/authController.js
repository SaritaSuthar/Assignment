const User = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};