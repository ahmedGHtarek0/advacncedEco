import mongoose,{Schema,Document} from "mongoose";

interface Iotp extends Document{
    otp:string,
    date:number
}
const schema= new Schema<Iotp>({
    otp:{type:String,required:true},
    date:{type:Number,required:true}
})

const OtpDb= mongoose.model<Iotp>('Otp',schema)
export default OtpDb