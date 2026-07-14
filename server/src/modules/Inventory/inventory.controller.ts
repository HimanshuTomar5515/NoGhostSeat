import {Response ,Request} from "express"
import { Inventory,Iseat } from "./inventory.model"


export const intializeInventory=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        
        const {showId,rows,seatsPerRow}=req.body

        const seats:Iseat[]=[]
        for(const row of rows){
             for(let seatNumber=1;seatNumber<=seatsPerRow;seatNumber++){
                seats.push({
                    seatNumber:`${row}${seatNumber}`,
                    status:"AVAILABLE"
                })
             }
        }

        const inventory=await Inventory.create({
            showId,
            seats
        })

        res.status(201).json({
            success:true,
            data:inventory
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"failed to initialize inventory",
            error
        })
    }
}

export const getInventoryByShowId=async(
    req:Request,
    res:Response
):Promise<void>=>{
    try {
        
        const {showId}=req.params

        const inventory=await Inventory.findOne({showId})

        if(!inventory){
             res.status(404).json({
                success:false,
                message:"Inventory is not found for this show"
            })
            return;
        }

        res.status(201).json({
            success:true,
            data:inventory
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}
