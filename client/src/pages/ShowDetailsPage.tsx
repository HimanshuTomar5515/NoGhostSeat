import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import { SeatGrid } from "../components/SeatGrid";
import { PaymentActions } from "../components/PaymentActions";

interface Seat {
  seatNumber: string;
  status: "AVAILABLE" | "LOCKED" | "BOOKED";
}

export const ShowDetailsPage = () => {
  const { showId } = useParams();

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get(`/api/inventory/show/${showId}`);

        setSeats(response.data.data.seats);
      } catch (err) {
        setError("Failed to load seats");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [showId]);

  const handleToggleSeat = (seatNumber: string) => {
    setSelectedSeats((currentSeats) => {
      if (currentSeats.includes(seatNumber)) {
        return currentSeats.filter((seat) => seat !== seatNumber);
      }

      return [...currentSeats, seatNumber];
    });
  };

  const handleCreateBooking = async () => {
    try {
      setBookingMessage("");
      setBookingError("");

      if (selectedSeats.length === 0) {
        setBookingError("Please select at least one seat.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setBookingError("Please login first. Token not found.");
        return;
      }

      setBookingLoading(true);

      const response = await api.post(
        "/api/bookings",
        {
          showId,
          seats: selectedSeats,
          totalAmount: selectedSeats.length * 500,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const createdBookingId = response.data.data._id;

      setBookingId(createdBookingId);

      setBookingMessage(
        `Booking created successfully. Booking ID: ${createdBookingId}`,
      );

      await refreshInventory();
      setSelectedSeats([]);
    } catch (err: any) {
      setBookingError(
        err.response?.data?.message || "Failed to create booking",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const refreshInventory = async () => {
    const inventoryResponse = await api.get(`/api/inventory/show/${showId}`);
    setSeats(inventoryResponse.data.data.seats);
  };

  if (loading) {
    return <p>Loading seats...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
     <div className="page">
    <div className="page-header">
      <h1 className="page-title">Select Seats</h1>
      <p className="page-subtitle">
        Green seats are available. Locked and booked seats cannot be selected.
      </p>
    </div>

      {seats.length === 0 ? (
        <p>No seats found for this show. Please initialize inventory.</p>
      ) : (
        <SeatGrid
          seats={seats}
          selectedSeats={selectedSeats}
          onToggleSeat={handleToggleSeat}
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Seats</h3>
        {selectedSeats.length === 0 ? (
          <p>No seats selected.</p>
        ) : (
          <p>{selectedSeats.join(", ")}</p>
        )}

        <button
          onClick={handleCreateBooking}
          disabled={bookingLoading || selectedSeats.length === 0}
          className="btn btn-primary"
          style={{
            marginTop: "12px",
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: bookingLoading ? "not-allowed" : "pointer",
          }}
        >
          {bookingLoading ? "Booking..." : "Book Selected Seats"}
        </button>

        {bookingMessage && <p style={{ color: "green" }}>{bookingMessage}</p>}
        {bookingError && <p style={{ color: "red" }}>{bookingError}</p>}

        {bookingId && (
          <PaymentActions
            bookingId={bookingId}
            onPaymentComplete={refreshInventory}
          />
        )}
      </div>
    </div>
  );
};
