import  {body, validationResult} from "express-validator"







export const validateRegisterUser =[
    body("email")
        .isEmail.withMessage("Invalid eamil format"),
    body("contact")
        .notEmpty().withMessage("Contect is required")
        .matches( /^\d{10}$/).withMessage("Contact must be a 10-digit number"),
    body("password")
        .isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("fullname")
        .notEmpty().withMessage("full name is required")
        .length({min:3}).withMessage("full name must be at least 3 characters long")
]