import mongoose, { Schema, Types, Document } from "mongoose";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";

export interface Ibooking extends Document {
  showId: Types.ObjectId;
  userId?: string;
  seats: string[];
  status: BookingStatus;
  totalAmount: number;
  expiresAt: Date;
}

const bookingSchema = new Schema<Ibooking>({
  showId: {
    type: Schema.Types.ObjectId,
    ref: "Show",
    required: true,
  },
  userId: {
    type: String,
  },
  seats: {
    type: [String],
    required: true,
    validate: {
      validator: function (value: string[]) {
        return value.length > 0;
      },
      message: "Booking must contain at least one seat",
    },
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"],
    default: "PENDING",
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
},{
  timestamps:true
}
);

export const Booking=mongoose.model<Ibooking>("Booking",bookingSchema)
