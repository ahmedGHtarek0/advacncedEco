import express from 'express'
import mongoose from 'mongoose'
import Custroutes from './Routes/Custroutes'

const app=express()
const port=3000
mongoose.connect('mongodb://localhost:27017/advcancedEcommercepro')
.then(()=>console.log('coneccted to DB'))
 .catch((err)=>console.log(err,"db err"))
app.use(express.json())
app.use('/cust',Custroutes)
 app.listen(port,()=>{
    console.log('the server done ')
 })