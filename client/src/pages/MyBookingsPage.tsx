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

  const getStatusStyle = (status: string) => {
  if (status === "CONFIRMED") {
    return {
      background: "#dcfce7",
      color: "#166534",
    };
  }

  if (status === "PENDING") {
    return {
      background: "#fef3c7",
      color: "#92400e",
    };
  }

  if (status === "CANCELLED") {
    return {
      background: "#fee2e2",
      color: "#991b1b",
    };
  }

  if (status === "EXPIRED") {
    return {
      background: "#e2e8f0",
      color: "#475569",
    };
  }

  return {
    background: "#e0f2fe",
    color: "#075985",
  };
};

  if (loading) {
  return (
    <div className="page">
      <div className="card">Loading bookings...</div>
    </div>
  );
}

if (error) {
  return (
    <div className="page">
      <div className="card error">{error}</div>
    </div>
  );
}
return (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">My Bookings</h1>
      <p className="page-subtitle">
        Track your pending, confirmed, cancelled, and expired bookings.
      </p>
    </div>

    {bookings.length === 0 ? (
      <div className="card">
        <p>No bookings found.</p>
      </div>
    ) : (
      <div className="grid">
        {bookings.map((booking) => (
          <div className="card" key={booking._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                alignItems: "flex-start",
                marginBottom: "12px",
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 6px" }}>
                  Booking #{booking._id.slice(-6).toUpperCase()}
                </h2>
                <p style={{ margin: 0, color: "#64748b" }}>
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleString()
                    : "Created date not available"}
                </p>
              </div>

              <span
                style={{
                  ...getStatusStyle(booking.status),
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 800,
                }}
              >
                {booking.status}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              <div>
                <p style={{ margin: "0 0 4px", color: "#64748b" }}>Seats</p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  {booking.seats.join(", ")}
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 4px", color: "#64748b" }}>Amount</p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  ₹{booking.totalAmount}
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 4px", color: "#64748b" }}>
                  Show Time
                </p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  {booking.showId?.startTime
                    ? new Date(booking.showId.startTime).toLocaleString()
                    : "Not available"}
                </p>
              </div>

              <div>
                <p style={{ margin: "0 0 4px", color: "#64748b" }}>
                  Expires At
                </p>
                <p style={{ margin: 0, fontWeight: 700 }}>
                  {booking.expiresAt
                    ? new Date(booking.expiresAt).toLocaleString()
                    : "Not available"}
                </p>
              </div>
            </div>

            {booking.status === "PENDING" && (
              <div
                style={{
                  marginTop: "18px",
                  paddingTop: "16px",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <PaymentActions
                  bookingId={booking._id}
                  onPaymentComplete={fetchBookings}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

};