import { body, validationResult } from "express-validator";

// flow-
//Request → Validation Rules → validate middleware → Controller
//Request → Errors → validate → response sent (STOP)
//Request → Errors → validate → response sent (STOP)

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("fullname").notEmpty().withMessage("Fullname is required"),
];

export const loginValidation = [
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req); //req k andar hi sare msg aa rahe hote hay.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //muktiple errors fail ho sakte hay isliye un sab ko ek sath bhejne k liye hum array() use karte hay.
  }
  next(); //If no errors → move to next middleware/controller
};
