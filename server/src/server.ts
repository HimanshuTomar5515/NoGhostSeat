import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { processExpiredBookings } from "./modules/bookings/booking.expiry";

dotenv.config();
const PORT = process.env.PORT || 5000;

const startserver = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`seatflow api is running on port ${PORT}`);
  });

  setInterval(async () => {
    try {
      const expiredCount = await processExpiredBookings();

      if (expiredCount > 0) {
        console.log(`Expired ${expiredCount} pending bookings`);
      }
    } catch (error) {
      console.error("Failed to process expired bookings", error);
    }
  }, 60 * 1000);
};

startserver();
