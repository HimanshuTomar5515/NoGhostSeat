import {intializeInventory,getInventoryByShowId} from "./inventory.controller"
import Router from "express"

const router =Router()

router.post("/initialize",intializeInventory)
router.get("/show/:showId",getInventoryByShowId)

export default router

