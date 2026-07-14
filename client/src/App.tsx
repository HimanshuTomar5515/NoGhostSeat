import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ShowsPage } from "./pages/ShowsPage";
import { ShowDetailsPage } from "./pages/ShowDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage"
import { Navbar } from "./components/Navbar";
import { MyBookingsPage } from "./pages/MyBookingsPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/shows/:showId" element={<ShowDetailsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;