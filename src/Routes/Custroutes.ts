import express from 'express'
import { Addcust } from '../servisc/Custservices'

const router= express()
router.post('/signupcustomer',async(req,res)=>{
    const {email,password}=req.body
    const {data,status}:any= await Addcust({email,password})
    res.status(status).send(data)
})

export default router