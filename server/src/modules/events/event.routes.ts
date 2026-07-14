import { createEvent,getEvents } from "./event.controller";
import Router from "express"

const router=Router()

router.post("/",createEvent)
router.get("/",getEvents)

export default router