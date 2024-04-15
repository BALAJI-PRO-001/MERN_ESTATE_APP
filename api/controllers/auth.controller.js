import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({userName: userName, email: email, password: hashedPassword});
  try {
    await newUser.save();
    res.status(201).json({"message": "New User Created ..."});
  } catch(error) {
    next(error);
  } 
}      


export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  try { 
    const validUser = await User.findOne({email: email});
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const isvalidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isvalidPassword) return next(errorHandler(401, "Invalid password!"));
    const token = jwt.sign(validUser._id.toString(), process.env.JWT_SECRET_KEY);
    const {password: pass, ...user} = validUser._doc;
    res.cookie("access_token", token, {httpOnly: true}).status(200).json({user});
  } catch(error) {
    next(error);  
  }
}