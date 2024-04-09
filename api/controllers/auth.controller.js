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
    next(error);
  } 
}      


export const signin = async (req, res, next) => {
  const {email, password} = req.body;
  try { 
    const validUser = User.findOne({email: email});
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const isvalidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isvalidPassword) return next(errorHandler(401, "Invalid password!"))
  } catch(error) {
    next(error);
  }
}