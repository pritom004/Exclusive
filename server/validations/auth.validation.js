import { body } from "express-validator";

export const signupValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ];
};

export const loginValidationRules = () => {
  return [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export const updateProfileValidationRules = () => {
  return [
    body("fullName").trim().notEmpty().withMessage("Full Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("currentPassword").optional().isString(),
    body("newPassword").optional().isLength({ min: 6 }).withMessage("New Password must be at least 6 characters long"),
  ];
};
