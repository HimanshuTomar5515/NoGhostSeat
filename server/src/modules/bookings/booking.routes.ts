import { Router } from "express";
import { createBooking ,getBookingById,expireBookingPendings,getMyBookings} from "./booking.controller";
import { protect } from "../../shared/middleware/auth.middleware";

const router = Router();

router.post("/",protect, createBooking);
router.get("/my-bookings",protect,getMyBookings)
router.post("/expire", expireBookingPendings);
router.get("/:bookingId", getBookingById);

export default router;