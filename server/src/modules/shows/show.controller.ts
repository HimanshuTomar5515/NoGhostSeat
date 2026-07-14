import {Show} from "./show.model"
import {Response,Request} from "express"

export const createShow=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        const show=await Show.create(req.body)

        res.status(201).json({
            success:true,
            message:"show created successfully",
            data:show
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"show is not created",
            error
        })
    }
}

export const getShows=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        
        const shows=await Show.find().populate("EventId", "title category durationMinutes")
      .populate("VenueId", "name city address totalSeats")
      .sort({ startTime: 1 });


        res.status(201).json({
            success:true,
            message:"shows fetched successfully",
            count:shows.length,
            data:shows
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"show data is not fetched",
            error
        })
    }
}
