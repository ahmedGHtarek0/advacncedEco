import { NextFunction ,Request,Response} from "express";
import jwt from 'jsonwebtoken'
import CustDb from "../DB/curtomerDb";
import mongoose from "mongoose";
interface Extendsreq extends Request{
    cust?:any
}
export const accesstokenmiddwlwareforCust=(req:Extendsreq,res:Response,next:NextFunction)=>{
    const authorization = req.get("authorization");
    if(!authorization){
        res.status(403).send('no authorization header :(')
        return
    }
    const token =authorization.split(' ')[1]
    if(!token){
        res.status(403).send('the fucken token wasnot here  :(((')
        return
       }
       jwt.verify(token,'cust',async(err:any,payload:any)=>{
        if(err){
            res.status(403).send('expired token')
            return
        }
        if(!payload){//just for error
            res.status(403).send('there is an error')
        }
        
        const cust = await CustDb.findOne({ _id: new mongoose.Types.ObjectId(payload.id) });
        if(!cust){
            res.status(403).send('the user is not exist')
        }
        req.cust=cust
        console.log(req.cust._id)
        next()
       })
}

export default accesstokenmiddwlwareforCust