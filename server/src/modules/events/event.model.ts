import mongoose, {Schema,Document} from "mongoose"

export type EventCategory =
  | "MOVIE"
  | "CONCERT"
  | "SPORTS"
  | "COMEDY"
  | "CONFERENCE";

  export interface IEvent extends Document{
      title:String,
      description:String,
      category:EventCategory,
      durationTime:number
  }

  const eventSchema=new Schema<IEvent>(
      {
       title: {
            type:String,
            required:true,
            trim:true
        },
        description: {
            type:String,
            required:true,
            trim:true
        },
        category: {
            type:String,
            required:true,
            enum: ["MOVIE", "CONCERT", "SPORTS", "COMEDY", "CONFERENCE"],
        },
        durationTime: {
            type:Number,
            required:true,
            min:1
        }
      },
      {
        timestamps:true
      }
  )

  export  const Event=mongoose.model<IEvent>("Event",eventSchema)
