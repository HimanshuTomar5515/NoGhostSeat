import express from "express";
import cors from "cors";
import venueRoutes from "./modules/venues/venue.routes"
import eventRoutes from "./modules/events/event.routes"
import showRoutes from "./modules/shows/show.routes"
import inventoryRoutes from "./modules/Inventory/inventory.routes"
import bookingRoutes from "./modules/bookings/booking.routes"
import paymentRoutes from "./modules/payments/payment.routes"
import authRoutes from "./modules/auth/auth.routes"
const app=express()

app.use(cors())
app.use(express.json())

app.get('/health',(req,res)=>{
    res.status(200).json({
        
        status:"ok",
        service:"seatflow-api"
    })
})

app.use("/api/venues",venueRoutes)
app.use("/api/events",eventRoutes)
app.use("/api/shows",showRoutes)
app.use("/api/inventory",inventoryRoutes)
app.use("/api/bookings",bookingRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/auth",authRoutes)

export default app;