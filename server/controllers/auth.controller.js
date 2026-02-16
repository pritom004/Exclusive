import User from "../models/user.model.js";
import {
  changePassword,
  createAccessToken,
  loginUser,
  signToken,
  verifyToken,
} from "../services/auth.service.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({
        message: "All fields are required!",
      });
    }
    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing up",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    const token = await signToken({ id: user._id });

    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    user.refreshToken = token;
    await user.save();

    return res.status(200).json({
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const getAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    //Decoded is a object
    const decoded = await verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: "Unauthorized!",
      });
    }

    const accessToken = await createAccessToken({ id: user._id });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { fullName, email, address, currentPassword, newPassword } = req.body;
  try {
    if (!fullName || !email) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    if (currentPassword || newPassword) {
      if (currentPassword && newPassword) {
        const changedPassword = await changePassword(
          currentPassword,
          newPassword,
          req.userId,
        );

        if (changedPassword) {
          return res.status(200).json({
            message: "Password changed successfully",
            data: {
              _id: changedPassword._id,
              name: changePassword.name,
              email: changedPassword.email,
              role: changedPassword.role,
              isVerified: changedPassword.isVerified,
              address: changedPassword.address,
            }
          });
        }
      } else {
        return res.status(400).json({
          message: "All fields are required!",
        });
      }
    }

    const updatedProfile = await User.findByIdAndUpdate(req.userId, {
      name: fullName,
      email,
      address: address || "",
    }).select("-password -refreshToken")
    

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};
