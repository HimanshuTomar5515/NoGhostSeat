import { createShow,getShows } from "./show.controller";
import Router from "express"

const router=Router()

router.post("/",createShow)
router.get("/",getShows)

export default router

