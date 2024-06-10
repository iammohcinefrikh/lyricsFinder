// import the express module
import express from "express";
// import the getartists function from the artistcontroller module
import { getArtists } from "../controllers/artistController";
import { createArtist, updateArtist } from "../controllers/artistController";
// import the verifytoken function from the verifytokenutil module
import { verifyToken } from "../utils/verifyTokenUtil";
import { validateArtist } from "../middlewares/artistMidleware";

// create a new router object
const router = express.Router();

// define a route to get all artists
// this route is protected by the verifytoken middleware
router.get("/api/v1/artists", getArtists);
router.post("/api/v1/artists", validateArtist, createArtist);
router.put("/api/v1/artists/:id", updateArtist);

// export the router object
export default router;
