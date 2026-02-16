import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userId,
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      },
    );
  });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or password doesn't match")
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Email or password doesn't match");
  }

  return user;
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded);
    });
  });
};

export const createAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userId,
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 1000 * 60 * 30 },
      (err, token) => {
        if(err) reject(err);
        resolve(token)
      },
    );
  });
};

export const changePassword = async (currentPassword, newPassword, userId) => {
  const user = await User.findById(userId);

  if(!user){
    throw new Error("User not found!")
  }

 const isMatch = await user.comparePassword(currentPassword)

 if(!isMatch){
  throw new Error("Invalid request!")
 }

 user.password = newPassword;
 await user.save()

 return user;
};