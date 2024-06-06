import express from "express";
import { validateUserRegistration, validateUserLogin, validateUserPasswordResetRequest, validateUserPasswordReset, handleValidationErrors } from "../middlewares/validationMiddleware";
import { userRegister, userLogin, userPasswordResetRequest, userPasswordReset } from "../controllers/userController";
import { verifyToken } from "../utils/verifyTokenUtil";

const router = express.Router();

router.post("/api/v1/user/register", validateUserRegistration, userRegister);
router.post("/api/v1/user/login", validateUserLogin, userLogin);
router.post("/api/v1/user/request-password-reset", validateUserPasswordResetRequest, verifyToken, userPasswordResetRequest);
router.post("/api/v1/user/password-rest", validateUserPasswordReset, verifyToken, userPasswordReset);
router.use(handleValidationErrors);

export default router;