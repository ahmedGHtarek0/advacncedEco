import mongoose,{Schema,Document} from "mongoose";

interface Icsut extends Document{
    name:string
    email:string;
    password:string;
}

const shcmeamcustomer= new Schema<Icsut>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const CustDb= mongoose.model<Icsut>('Customer',shcmeamcustomer)
 export default CustDb