import mongoose from "mongoose";

export const connectDB=async():Promise<void>=>{
    
    try {
        
        const mongouri=process.env.MONGO_URI;

        if(!mongouri){
            throw new Error("mongouri is missing");
        }

        await mongoose.connect(mongouri);
        console.log("Database connected");
    } catch (error) {
        console.error("mongodb connection failed");
        process.exit(1);
    }
}