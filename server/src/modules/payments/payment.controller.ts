import { Request, Response } from "express";
import { Booking } from "../bookings/booking.model";
import { Inventory } from "../Inventory/inventory.model";

export const confirmPayment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      res.status(400).json({
        success: false,
        message: "bookingId is required",
      });
      return;
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    if (booking.status !== "PENDING") {
      res.status(400).json({
        success: false,
        message: `Booking cannot be confirmed from status ${booking.status}`,
      });
      return;
    }

    if (booking.expiresAt < new Date()) {
      booking.status = "EXPIRED";
      await booking.save();

      res.status(400).json({
        success: false,
        message: "Booking has expired",
      });
      return;
    }

    const updateResult = await Inventory.updateOne(
      {
        showId: booking.showId,
      },
      {
        $set: {
          "seats.$[seat].status": "BOOKED",
        },
      },
      {
        arrayFilters: [
          {
            "seat.seatNumber": { $in: booking.seats },
            "seat.status": "LOCKED",
          },
        ],
      },
    );

    if (updateResult.modifiedCount === 0) {
      res.status(409).json({
        success: false,
        message: "Unable to confirm seats",
      });
      return;
    }

    booking.status = "CONFIRMED";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment confirmed and booking completed",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error,
    });
  }
};

export const failPayment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      res.status(400).json({
        success: false,
        message: "Booking id is required",
      });
      return;
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "booking is not found",
      });
      return;
    }

    if (booking.status !== "PENDING") {
      res.status(400).json({
        success: false,
        message: `Booking cannot be cancelled from status ${booking.status}`,
      });
      return;
    }
    await Inventory.updateOne(
      {
        showId: booking.showId,
      },
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
      },
    );

    booking.status = "CANCELLED";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment failed and booking cancelled",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
