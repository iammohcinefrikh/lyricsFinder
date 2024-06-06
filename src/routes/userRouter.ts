// import necessary modules
import express from "express";
import { validateUserRegistration, validateUserLogin, validateUserPasswordReset, handleValidationErrors } from "../middlewares/validationMiddleware";
import { userRegister, userLogin, userPasswordResetRequest, userPasswordReset } from "../controllers/userController";
import { verifyToken } from "../utils/verifyTokenUtil";

// create a new router
const router = express.Router();

// define the route for user registration
// this route validates the user registration request, handles any validation errors, and then registers the user
router.post("/api/v1/user/register", validateUserRegistration, handleValidationErrors, userRegister);

// define the route for user login
// this route validates the user login request, handles any validation errors, and then logs in the user
router.post("/api/v1/user/login", validateUserLogin, handleValidationErrors, userLogin);

// define the route for requesting a password reset
// this route verifies the user's token and then initiates the password reset request
router.post("/api/v1/user/request-password-reset", verifyToken, userPasswordResetRequest);

// define the route for resetting the password
// this route validates the password reset request, handles any validation errors, verifies the user's token, and then resets the password
router.post("/api/v1/user/password-reset", validateUserPasswordReset, handleValidationErrors, verifyToken, userPasswordReset);

// export the router
export default router;