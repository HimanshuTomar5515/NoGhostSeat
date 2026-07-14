import { Booking } from "./booking.model";
import { Inventory } from "../Inventory/inventory.model";

export const processExpiredBookings = async (): Promise<number> => {
  const now = new Date();

  const expiredBookings = await Booking.find({
    status: "PENDING",
    expiresAt: { $lt: now },
  });

  for (const booking of expiredBookings) {
    await Inventory.updateOne(
      { showId: booking.showId },
      {
        $set: {
          "seats.$[seat].status": "AVAILABLE",
        },
      },
      {
        arrayFilters: [
          {
            "seat.seatNumber": { $in: booking.seats },
            "seat.status": "LOCKED",
          },
        ],
      }
    );

    booking.status = "EXPIRED";
    await booking.save();
  }

  return expiredBookings.length;
};