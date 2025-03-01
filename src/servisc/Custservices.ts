import CustDb from "../DB/curtomerDb";
import nodemailer from 'nodemailer'

interface Custsignup{
    email:string;
    password:string
}
export const Addcust=async({email,password}:Custsignup)=>{
    const SerachaboutemailinDb= await CustDb.findOne({email:email})
    if(SerachaboutemailinDb){
        return({data:'ur email is already exits',status:401})
    }
    else{
        return({data:'ok',status:200})
    }
}