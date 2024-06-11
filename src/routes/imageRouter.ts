// import the express module
import express from "express";
import imageController from "../controllers/imageController";
import {upload} from "../middlewares/uploadImage";

// create a new router object
const router = express.Router();

router.post("/api/v1/upload", upload.single('image'), imageController.uploadImage);

export default router;