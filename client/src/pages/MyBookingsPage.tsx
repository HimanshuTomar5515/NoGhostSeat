import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { PaymentActions } from "../components/PaymentActions";

interface ShowInfo {
  _id: string;
  startTime: string;
  basePrice: number;
  status: string;
}

interface Booking {
  _id: string;
  showId: ShowInfo;
  seats: string[];
  status: string;
  totalAmount: number;
  expiresAt: string;
  createdAt: string;
}

export const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view bookings.");
      return;
    }

    const response = await api.get("/api/bookings/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings(response.data.data);
  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to load bookings");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBookings();

    const intervalId = setInterval(() => {
    fetchBookings();
  }, 10000);

  return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <p>Booking ID: {booking._id}</p>
            <p>Seats: {booking.seats.join(", ")}</p>
            <p>Status: {booking.status}</p>
            <p>Total Amount: ₹{booking.totalAmount}</p>
            <p>
              Show Time:{" "}
              {new Date(booking.showId.startTime).toLocaleString()}
            </p>
            <p>Created At: {new Date(booking.createdAt).toLocaleString()}</p>

            {booking.status === "PENDING" && (
  <PaymentActions
    bookingId={booking._id}
    onPaymentComplete={fetchBookings}
  />
)}
          </div>
        ))
      )}
    </div>
  );
};