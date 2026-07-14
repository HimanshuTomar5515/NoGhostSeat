import {Router } from "express"
import { createVenue,getVenues } from "./venue.controller"
const router=Router()

router.post("/",createVenue);
router.get("/",getVenues);

export default router;