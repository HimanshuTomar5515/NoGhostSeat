import mongoose ,{Schema,Document} from "mongoose"

export interface Ivenue extends Document{
    name:String,
    city:String,
    address:String,
    totalseats:number
}

const venueSchema=new Schema<Ivenue>(
    {
       name: {
           type:String,
           required:true,
           trim:true,
        },
        city:{
            type:String,
            required:true,
            trim:true
        },
        address:{
            type:String,
            required:true,
            trim:true
        },
        totalseats:{
            type:Number,
            required:true,
            min:1
        }
    },
    {
        timestamps:true
    }

);

export const Venue=mongoose.model<Ivenue>("Venue",venueSchema);