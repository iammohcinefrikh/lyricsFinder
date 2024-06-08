import express from "express";
import {newsletterSend, subscribeUser, unSubscribeUser} from "../controllers/newsletterController"
import {verifyToken} from "../utils/verifyTokenUtil"

const router = express.Router();

router.post("/api/v1/sendNewsletters", verifyToken, newsletterSend);
router.post("/api/v1/subscribe", verifyToken, subscribeUser);
router.post("/api/v1/unSubscribe", verifyToken, unSubscribeUser);

export default router;
