import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

// creating a user using :POST "/auth/register" ..no login required
export const register = async (req, res) => {
  // res.json('register')
  try {
    if (req.body.password) {
        console.log(req.body.password)
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashPassword,
      });
      await newUser.save();
      return res.status(201).json("New User Created!");
    } else {
      return res.status(403).json("please provide a password!");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//Log in using username and password POST "/auth/login"
export const login = async (req, res) => {
  // res.json("login")
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(404).json("no user found");
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.status(400).json("wrong password");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        username: user.username,
      });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
//Logout
export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("logout");
};
