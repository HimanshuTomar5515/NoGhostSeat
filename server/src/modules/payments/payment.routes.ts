import { Router } from "express";
import { confirmPayment,failPayment } from "./payment.controller";

const router = Router();

router.post("/confirm", confirmPayment);
router.post("/fail", failPayment);

export default router;