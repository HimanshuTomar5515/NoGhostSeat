import { Request, Response } from "express";
import { Booking } from "./booking.model";
import { Inventory } from "../Inventory/inventory.model";
import { AuthRequest } from "../../shared/middleware/auth.middleware";

const LOCK_DURATION_MINUTES = 1;

export const createBooking = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { showId, seats, totalAmount } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    if (!showId || !Array.isArray(seats) || seats.length === 0) {
      res.status(400).json({
        success: false,
        message: "showId and seats are required",
      });
      return;
    }

    const inventory = await Inventory.findOne({ showId });

    if (!inventory) {
      res.status(404).json({
        success: false,
        message: "Inventory not found for this show",
      });
      return;
    }

    const requestedSeats = inventory.seats.filter((seat) =>
      seats.includes(seat.seatNumber),
    );

    if (requestedSeats.length !== seats.length) {
      res.status(400).json({
        success: false,
        message: "One or more selected seats do not exist",
      });
      return;
    }

    const unavailableSeats = requestedSeats.filter(
      (seat) => seat.status !== "AVAILABLE",
    );

    if (unavailableSeats.length > 0) {
      res.status(409).json({
        success: false,
        message: "One or more seats are not available",
        unavailableSeats: unavailableSeats.map((seat) => seat.seatNumber),
      });
      return;
    }

    const lockResult = await Inventory.updateOne(
      {
        showId,
      },
      {
        $set: {
          "seats.$[seat].status": "LOCKED",
        },
      },
      {
        arrayFilters: [
          {
            "seat.seatNumber": { $in: seats },
            "seat.status": "AVAILABLE",
          },
        ],
      },
    );

    if (lockResult.modifiedCount === 0) {
      res.status(409).json({
        success: false,
        message: "Failed to lock seats. Please try again.",
      });
      return;
    }

    const expiresAt = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);

    const booking = await Booking.create({
      showId,
      userId,
      seats,
      totalAmount,
      expiresAt,
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error,
    });
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId);

    const booking = await Booking.findById(bookingId).populate(
      "showId",
      "startTime basePrice status",
    );
    console.log(booking);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: "booking  is not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetched booking by id",
      error,
    });
  }
};

export const expireBookingPendings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const now = new Date();

    const expiredBookings = await Booking.find({
      status: "PENDING",
      expiresAt: { $lt: now },
    });

    for (const booking of expiredBookings) {
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
      ((booking.status = "EXPIRED"), await booking.save());
    }

    res.status(200).json({
      success: true,
      message: "expired bookings processed",
      expiredCount: expiredBookings.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getMyBookings = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    const bookings = await Booking.find({ userId })
      .populate("showId", "startTime basePrice status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings",
      error,
    });
  }
};
