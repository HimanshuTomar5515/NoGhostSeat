import mongoose,{Schema,Types,Document} from "mongoose"

export type SeatStatus = "AVAILABLE" | "LOCKED" | "BOOKED";
export interface Iseat{
    seatNumber:String,
    status:SeatStatus
}

export interface IInventory extends Document{
    showId:Types.ObjectId,
    seats:Iseat[]
}

const seatSchema=new Schema<Iseat>(
    {
        seatNumber:{
            type:String,
            required:true,
            trim:true,
        },
        status:{
            type:String,
            enum:["AVAILABLE" , "LOCKED" , "BOOKED"],
            default:"AVAILABLE"
        }
    },
    {
        _id:false
    }
)

const inventorySchema=new Schema<IInventory>(
    {
        showId:{
            type:Schema.Types.ObjectId,
            required:true,
            unique:true
        },
        seats:{
            type:[seatSchema],
            required:true
        }
    },
    {
        timestamps:true
    }

)

export const Inventory=mongoose.model<IInventory>("Inventory",inventorySchema)