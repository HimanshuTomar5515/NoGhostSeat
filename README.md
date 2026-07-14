<div align="center">

# 🎟️ NoGhostSeat

**A MERN + TypeScript ticket-booking system built for failure-aware, real-world booking scenarios.**

</div>

---

NoGhostSeat is a MERN + TypeScript ticket-booking system focused on **failure-aware booking**. Instead of being just a CRUD application, it handles real-world booking scenarios such as temporary seat locking, payment success/failure, booking expiry, and double-booking prevention.

---

## ✨ Features

- 🔐 JWT Authentication
- 🎭 Show and seat management
- 🔒 Temporary seat locking
- 🔄 Booking lifecycle management
- 💳 Payment simulation
- ⏱️ Automatic booking expiry
- 📋 My Bookings page
- 🔁 Polling for booking status updates

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

---

## 🏗️ Architecture

```
React
   │
   ▼
Express + TypeScript
   │
   ▼
MongoDB Atlas
```

Backend modules:
- Auth
- Users
- Venues
- Events
- Shows
- Inventory
- Bookings
- Payments

---

## 🎫 Booking Lifecycle

```
AVAILABLE
    │
    ▼
LOCKED
    │
 ┌──┴─────────────┐
 │                │
 ▼                ▼
BOOKED       AVAILABLE
(Payment)    (Failed/Expired)
```

Booking states:
```
PENDING
   │
   ├──► CONFIRMED
   ├──► CANCELLED
   └──► EXPIRED
```

---

## 📁 Project Structure

```
seatflow/
│
├── client/
└── server/
    ├── src/
    │   ├── config/
    │   ├── modules/
    │   ├── shared/
    │   ├── app.ts
    │   └── server.ts
```

---

## 🚀 Getting Started

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔄 Main Flow

1. Register/Login
2. Browse shows
3. Select seats
4. Create booking
5. Seats become **LOCKED**
6. Confirm payment → **BOOKED**
7. Fail payment or timeout → Seats become **AVAILABLE**

---

## 🧠 System Design Concepts

- Modular Monolith
- MongoDB Data Modeling
- Show-level Inventory
- Temporary Seat Locking
- Booking Lifecycle
- Payment Recovery
- Booking Expiry Worker
- Concurrency-aware Seat Reservation
- Backend as Source of Truth

---

## 🔮 Future Improvements

- Admin Dashboard
- Redis for Seat Locks
- WebSockets for Live Seat Updates
- Real Payment Gateway
- Role-based Authorization

---

<div align="center">

Made with ❤️ by [Himanshu Tomar](https://github.com/HimanshuTomar5515)

</div>


## Resume Highlight

Built **NoGhostSeat**, a MERN + TypeScript ticket-booking system featuring modular architecture, JWT authentication, temporary seat locking, booking lifecycle management, payment simulation, booking expiry, and concurrency-aware seat reservation.
