import bcryptjs from "bcryptjs";
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
    next(error.message);
  }
}      