import mongoose ,{Schema,Document,Types} from "mongoose"

export type showStatus= "CANCELLED" | "SCHEDULED" | "COMPLETED"

export interface IShows extends Document{
    EventId:Types.ObjectId,
    VenueId:Types.ObjectId,
    startTime:String,
    basePrice:number,
    status:showStatus
}

const showSchema=new Schema<IShows>(
    {
        EventId:{
            type:Schema.Types.ObjectId,
            ref:"Event",
            required:true
        },
        VenueId:{
            type:Schema.Types.ObjectId,
            ref:"Venue",
            required:true
        },
        startTime:{
            type:Date,
            required:true
        },
        basePrice:{
            type:Number,
            required:true,
            min:0
        },
        status:{
            type:String,
            enum:["CANCELLED" , "SCHEDULED" , "COMPLETED"],
            default:"SCHEDULED"
        }
    },
    {
        timestamps:true
    }
)

export const Show=mongoose.model<IShows>("Show",showSchema)