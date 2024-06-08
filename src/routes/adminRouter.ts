import express from "express";
//import { validateUserRegistration, validateUserLogin, validateUserPasswordReset, handleValidationErrors } from "../middlewares/validationMiddleware";
import { adminRegister, adminLogin, updateUser, deleteUser, getAllUsers } from "../controllers/adminController";
import { verifyToken } from "../utils/verifyTokenUtil";

const router = express.Router()

router.post("/api/v1/admin/register", adminRegister);
router.post("/api/v1/admin/login", adminLogin);
router.get("/api/v1/admin/getUsers", verifyToken, getAllUsers);
router.put("/api/v1/admin/update/:id", verifyToken, updateUser);
router.delete("/api/v1/admin/delete/:id", verifyToken, deleteUser);



export default router;