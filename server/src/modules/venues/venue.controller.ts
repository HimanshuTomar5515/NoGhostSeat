import {Request,Response} from "express"
import {Venue} from "./venue.model"

export const createVenue=async(req:Request,res:Response):Promise<void>=>{

    try {
        const venue=await Venue.create(req.body)

        res.status(201).json({
            success:true,
            message:"Venue created successfully",
            data:venue
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Venue not created",
            error
        }
            
        )
    }
}

export const getVenues=async(req:Request,res:Response):Promise<void>=>{

    try {
        const venues=await Venue.find().sort({createdAt:-1})

        res.status(201).json({
            success:true,
            count:venues.length,
            data:venues
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Venue data is not fetched",
            error
        })
    }
}

