import express from 'express'
import {  adduser, checkotp, Emailvrification } from '../servisc/Custservices'
import { accesstokenmiddwlwareforCust } from '../Middlewares/accesstokenfotCust'

const router= express()
router.post('/Emailvrification',async(req,res)=>{
    const {email}=req.body
    const {data,status}:any= await Emailvrification({email})
    res.status(status).send(data)
})

router.post('/addotp',async(req,res)=>{
    const {otp}=req.body
    const {data,status}= await checkotp({otp})
    res.status(status).send(data)
})

router.post('/addusers',async(req,res)=>{
const {name,email,password}=req.body
const {data,status}=await adduser({name,email,password})
const token=data.accesstoken
res.status(status).json(token);
})
router.get('/check',accesstokenmiddwlwareforCust,async(req:any,res)=>{
    console.log(req.cust._id)
    res.send(req.cust._id)
})
export default router