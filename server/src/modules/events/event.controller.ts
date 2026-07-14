import {Response,Request} from "express"
import {Event} from "./event.model"

export const createEvent=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        
        const event=await Event.create(req.body)

        res.status(201).json({
            success:true,
            message:"Event created successfully",
            data:event
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Event is not created",
            error
        })
    }
}

export const getEvents=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        
        const events=await Event.find().sort({createdAt:-1})

        res.status(201).json({
            success:true,
            count:events.length,
            data:events
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Events is not fetched",
            error
        })
    }
}
