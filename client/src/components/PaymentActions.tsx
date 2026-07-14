import { useState } from "react";
import { api } from "../api/axios";

interface PaymentActionsProps {
  bookingId: string;
  onPaymentComplete?: () => void | Promise<void>;
}

export const PaymentActions = ({
  bookingId,
  onPaymentComplete,
}: PaymentActionsProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentAction = async (action: "confirm" | "fail") => {
    try {
      setMessage("");
      setError("");
      setLoading(true);

      const endpoint =
        action === "confirm"
          ? "/api/payments/confirm"
          : "/api/payments/fail";

      const response = await api.post(endpoint, {
        bookingId,
      });

      setMessage(response.data.message);

      if (onPaymentComplete) {
        await onPaymentComplete();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <h3>Payment Simulation</h3>

      <button
        onClick={() => handlePaymentAction("confirm")}
        disabled={loading}
        style={{
          padding: "10px 16px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          marginRight: "8px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        Confirm Payment
      </button>

      <button
        onClick={() => handlePaymentAction("fail")}
        disabled={loading}
        style={{
          padding: "10px 16px",
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        Fail Payment
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};