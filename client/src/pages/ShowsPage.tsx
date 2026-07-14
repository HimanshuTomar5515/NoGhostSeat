import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

interface EventInfo {
  _id: string;
  title: string;
  category: string;
  durationMinutes: number;
}

interface VenueInfo {
  _id: string;
  name: string;
  city: string;
  address: string;
  totalSeats: number;
}

interface Show {
  _id: string;
  EventId: EventInfo;
  VenueId: VenueInfo;
  startTime: string;
  basePrice: number;
  status: string;
}

export const ShowsPage = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await api.get("/api/shows");
        setShows(response.data.data);
      } catch (err) {
        setError("Failed to load shows");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <p>Loading shows...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>NoGhostSeat Shows</h1>

      {shows.length === 0 ? (
        <p>No shows available.</p>
      ) : (
        <div>
          {shows.map((show) => (
            <div
              key={show._id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h2>{show.EventId.title}</h2>
              <p>Category: {show.EventId.category}</p>
              <p>
                Venue: {show.VenueId.name}, {show.VenueId.city}
              </p>
              <p>
                Time: {new Date(show.startTime).toLocaleString()}
              </p>
              <p>Price: ₹{show.basePrice}</p>
              <p>Status: {show.status}</p>

              <Link to={`/shows/${show._id}`}>View seats</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};