import { body } from "express-validator";

export const createPaymentIntentRules = () => {
  return [
    body("checkoutId").notEmpty().withMessage("Checkout ID is required"),
    body("fullName").trim().notEmpty().withMessage("Full Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("streetAddress").trim().notEmpty().withMessage("Street Address is required").isLength({ min: 6 }).withMessage("Street Address must be at least 6 characters"),
    body("city").trim().notEmpty().withMessage("City is required").isLength({ min: 2 }).withMessage("City must be at least 2 characters"),
    body("phoneNumber").trim().notEmpty().withMessage("Phone Number is required").isLength({ min: 6 }).withMessage("Phone number must be at least 6 characters"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
  ];
};
