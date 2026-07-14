import mongoose,{Schema,Types,Document} from "mongoose"

export type UserRole = "USER" | "ADMIN";

export interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    role:UserRole
}

const userSchema=new Schema<IUser>(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            select:true
        },
        role:{
            type:String,
            enum:["USER", "ADMIN"],
            default:"USER"
        }
    },
    {
       timestamps:true
    }
)

export const User=mongoose.model<IUser>("User",userSchema)