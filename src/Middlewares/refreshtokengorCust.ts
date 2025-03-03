import { NextFunction } from "express";
import jwt from 'jsonwebtoken'
import CustDb from "../DB/curtomerDb";
export const refreshadmin=(req:any,res:any,next:NextFunction)=>{
    try{
const auth= req.cookies
console.log(req.cookies)
if(!auth.allusersandadmin){
    res.send('where is the cookies')
}

jwt.verify(auth.allusersandadmin,'cookies',async(err:any,payload:any)=>{
    if(err){
        res.send('the cookies is erro or expires')
    }
    if(!payload){
        res.send('there is an eror i the payload')
    }
    const cust= await CustDb.findOne({email:payload.email})
    req.cust=cust
    
   const {email,password}:any=cust
    const genertajwtAdmin=(data:any)=>{
        return (jwt.sign(data,'Admin',{expiresIn:'1h'}))//s m h d
    }
   res.json({resfrestoken:genertajwtAdmin({email,password})})
    next()
})
    }
    catch(err){
        console.log('erro in refreshtoken admin '+err)
    }
}