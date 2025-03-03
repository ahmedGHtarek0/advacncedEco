import CustDb from "../DB/curtomerDb";
import nodemailer from 'nodemailer'
import OtpDb from "../DB/otpDb";
import { PassThrough } from "nodemailer/lib/xoauth2";
interface emialvre{
    email:string
}
function generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
  }
  
export const Email = async ({email}:emialvre) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:'sbdhdjdjdj0@gmail.com',
        pass: "srmt jlfc vsgi bagg ",
      },
    });
    const otp =generateOtp()
    const date=Date.now()+2*60*1000
    const addotptoDb= await OtpDb.create({date:date,otp:otp})
    await addotptoDb.save()
    try {
        const htmlTemplate = `
<div style="
    font-family: Arial, sans-serif;
    text-align: center;
    background: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
    margin: auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
">
    <h2 style="color: #333;">🔐 Your OTP Code</h2>
    <p style="font-size: 18px; color: #555;">Use the OTP below to verify your email:</p>
    <div style="
        font-size: 28px;
        font-weight: bold;
        background: #007bff;
        color: #fff;
        padding: 10px 20px;
        display: inline-block;
        border-radius: 5px;
        letter-spacing: 4px;
    ">
        ${otp}
    </div>
    <p style="margin-top: 15px; font-size: 14px; color: #777;">
        This OTP will expire in 2 minutes. Do not share it with anyone.
    </p>
</div>
`;

      const info = await transporter.sendMail({
        from: `"Maddison Foo Koch 👻" <sbdhdjdjdj0@gmail.com>`,
        to: `${email}`,
        subject: "Hello ✔",
        text:'hello bro' ,
        html: htmlTemplate,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
interface Custsignup{
    email:string;
}
export const Emailvrification=async({email}:Custsignup)=>{
    const SerachaboutemailinDb= await CustDb.findOne({email:email})
    if(SerachaboutemailinDb){
        return({data:'ur email is already exits',status:401})
    }
    else{
        Email({email})
        return({data:'send ur otp',status:200})
    }
}
interface otps{
otp:string
}

export const checkotp=async({otp}:otps)=>{
const otpcheckar=await OtpDb.findOne({otp:otp})
if(!otpcheckar){
    return({data:'there is not opt here',status:401})
} 
else {
    if(Date.now()<=otpcheckar.date){
        await OtpDb.findOneAndDelete({otp:otp})
        return({date:true,status:200})
    }
    else {
        await OtpDb.findOneAndDelete({otp:otp})
        return({data:'the otp is expired',status:401})
    }
}
}
interface addU{
    email:string,
    password:string,
    name:string
}
export const adduser=async({name,password,email}:addU)=>{
    const addusers= await CustDb.create({name,email,password})
    await addusers.save()
    return({data:{name,email,password},status:200})
}