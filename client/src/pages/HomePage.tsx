import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <LifecycleSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </main>
  );
};

const HeroSection = () => {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 70px)",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #7c3aed 100%)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          padding: "90px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.14)",
              padding: "8px 14px",
              borderRadius: "999px",
              marginBottom: "20px",
              fontWeight: 700,
            }}
          >
            🎟️ Failure-aware ticket booking
          </p>

          <h1
            style={{
              fontSize: "58px",
              lineHeight: 1.05,
              margin: "0 0 20px",
              letterSpacing: "-1.5px",
            }}
          >
            Book seats without the ghost booking problem.
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#dbeafe",
              maxWidth: "620px",
              marginBottom: "30px",
            }}
          >
            NoGhostSeat is a MERN + TypeScript ticket-booking system that
            handles temporary locks, payment recovery, booking expiry, and
            double-booking protection.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link className="hero-btn hero-btn-light" to="/shows">
              Explore Shows
            </Link>

            <Link className="hero-btn hero-btn-outline" to="/login">
              Login to Book
            </Link>
          </div>
        </div>

        <SeatPreviewCard />
      </div>
    </section>
  );
};

const SeatPreviewCard = () => {
  const seats = [
    ["A1", "#22c55e"],
    ["A2", "#22c55e"],
    ["A3", "#f97316"],
    ["A4", "#ef4444"],
    ["A5", "#22c55e"],
    ["B1", "#2563eb"],
    ["B2", "#2563eb"],
    ["B3", "#22c55e"],
    ["B4", "#f97316"],
    ["B5", "#ef4444"],
    ["C1", "#22c55e"],
    ["C2", "#22c55e"],
    ["C3", "#22c55e"],
    ["C4", "#2563eb"],
    ["C5", "#22c55e"],
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: "28px",
        padding: "28px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          background: "white",
          color: "#0f172a",
          borderRadius: "22px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Live Seat Flow</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
            margin: "22px 0",
          }}
        >
          {seats.map(([seat, color]) => (
            <div
              key={seat}
              style={{
                background: color,
                color: "white",
                height: "44px",
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
              }}
            >
              {seat}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          <MiniPoint text="AVAILABLE → LOCKED during checkout" />
          <MiniPoint text="LOCKED → BOOKED after payment" />
          <MiniPoint text="LOCKED → AVAILABLE after expiry/failure" />
        </div>
      </div>
    </div>
  );
};

const LifecycleSection = () => {
  return (
    <section style={{ padding: "70px 24px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <SectionHeader
          label="Booking lifecycle"
          title="Designed for real-world failure cases"
          text="NoGhostSeat does not directly book seats. It locks them first, waits for payment, and recovers safely if something goes wrong."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "18px",
          }}
        >
          <Step number="01" title="Select seats" text="User chooses available seats from show-level inventory." />
          <Step number="02" title="Lock seats" text="Backend changes selected seats from AVAILABLE to LOCKED." />
          <Step number="03" title="Payment result" text="Payment success confirms booking, failure releases seats." />
          <Step number="04" title="Expiry recovery" text="Worker expires abandoned bookings and releases locked seats." />
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section style={{ background: "white", padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
        }}
      >
        <Stat title="3 Seat States" text="Available, Locked, Booked" />
        <Stat title="4 Booking States" text="Pending, Confirmed, Cancelled, Expired" />
        <Stat title="JWT Auth" text="Secure protected booking flow" />
        <Stat title="Auto Expiry" text="Worker releases abandoned locks" />
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section style={{ padding: "70px 24px", background: "white" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <SectionHeader
          label="Core features"
          title="More than a CRUD booking app"
          text="The project focuses on system-design concepts that matter in interviews."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          <FeatureCard icon="🔒" title="Temporary Seat Locking" text="Seats are held during checkout so another user cannot take them immediately." />
          <FeatureCard icon="⚡" title="Atomic Updates" text="MongoDB conditional updates reduce double-booking risk." />
          <FeatureCard icon="💳" title="Payment Recovery" text="Payment success books seats; payment failure releases them." />
          <FeatureCard icon="⏳" title="Expiry Worker" text="Pending bookings expire automatically and locked seats become available." />
          <FeatureCard icon="🧩" title="Modular Monolith" text="Auth, inventory, booking, and payment logic stay separated by module." />
          <FeatureCard icon="👤" title="User Bookings" text="JWT-protected My Bookings page shows only logged-in user data." />
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  return (
    <section style={{ padding: "70px 24px", background: "#0f172a", color: "white" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <SectionHeader
          label="System flow"
          title="Frontend shows seats. Backend decides truth."
          text="The UI improves user experience, but every booking is validated again by the backend."
          dark
        />

        <pre
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "18px",
            padding: "24px",
            overflowX: "auto",
            lineHeight: 1.8,
          }}
        >
{`User selects seats
  ↓
POST /api/bookings
  ↓
Inventory checks seat status
  ↓
AVAILABLE → LOCKED
  ↓
Payment success: LOCKED → BOOKED
Payment failure: LOCKED → AVAILABLE
Expiry worker: LOCKED → AVAILABLE`}
        </pre>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section style={{ padding: "70px 24px", background: "white" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          background: "linear-gradient(135deg, #2563eb, #7c3aed)",
          color: "white",
          borderRadius: "28px",
          padding: "50px 24px",
        }}
      >
        <h2 style={{ fontSize: "36px", margin: "0 0 12px" }}>
          Ready to test the booking flow?
        </h2>
        <p style={{ color: "#dbeafe", fontSize: "18px", marginBottom: "26px" }}>
          Explore shows, select seats, create a booking, and simulate payment recovery.
        </p>

        <Link className="hero-btn hero-btn-light" to="/shows">
          Start Booking
        </Link>
      </div>
    </section>
  );
};

const SectionHeader = ({
  label,
  title,
  text,
  dark = false,
}: {
  label: string;
  title: string;
  text: string;
  dark?: boolean;
}) => {
  return (
    <div style={{ marginBottom: "34px" }}>
      <p
        style={{
          color: dark ? "#93c5fd" : "#2563eb",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {label}
      </p>
      <h2 style={{ fontSize: "36px", margin: "0 0 10px" }}>{title}</h2>
      <p style={{ color: dark ? "#cbd5e1" : "#64748b", maxWidth: "680px", lineHeight: 1.7 }}>
        {text}
      </p>
    </div>
  );
};

const Stat = ({ title, text }: { title: string; text: string }) => (
  <div className="card">
    <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
    <p style={{ margin: 0, color: "#64748b" }}>{text}</p>
  </div>
);

const Step = ({ number, title, text }: { number: string; title: string; text: string }) => (
  <div className="card">
    <p style={{ color: "#2563eb", fontWeight: 900 }}>{number}</p>
    <h3>{title}</h3>
    <p style={{ color: "#64748b", lineHeight: 1.6 }}>{text}</p>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) => (
  <div className="card">
    <div style={{ fontSize: "30px" }}>{icon}</div>
    <h3>{title}</h3>
    <p style={{ color: "#64748b", lineHeight: 1.6 }}>{text}</p>
  </div>
);

const MiniPoint = ({ text }: { text: string }) => (
  <div
    style={{
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "12px",
      fontWeight: 700,
    }}
  >
    ✅ {text}
  </div>
);
