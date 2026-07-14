interface Seat {
  seatNumber: string;
  status: "AVAILABLE" | "LOCKED" | "BOOKED";
}

interface SeatGridProps {
  seats: Seat[];
  selectedSeats: string[];
  onToggleSeat: (seatNumber: string) => void;
}

export const SeatGrid = ({
  seats,
  selectedSeats,
  onToggleSeat,
}: SeatGridProps) => {
  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      return "#2563eb";
    }

    if (seat.status === "AVAILABLE") {
      return "#22c55e";
    }

    if (seat.status === "LOCKED") {
      return "#f97316";
    }

    return "#ef4444";
  };

  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <span>🟩 Available </span>
        <span>🟦 Selected </span>
        <span>🟧 Locked </span>
        <span>🟥 Booked</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 48px)",
          gap: "8px",
        }}
      >
        {seats.map((seat) => {
          const disabled = seat.status !== "AVAILABLE";

          return (
            <button
              key={seat.seatNumber}
              disabled={disabled}
              onClick={() => onToggleSeat(seat.seatNumber)}
              style={{
                height: "40px",
                backgroundColor: getSeatColor(seat),
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};