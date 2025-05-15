import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectDb=async()=>{
   try {
    const  connect=await mongoose.connect(process.env.MONGODB_URL)
    if(connect){
      return  console.log('Mongodb connected');
        
    }
   return console.log('error in connecting db');
    
   } catch (error) {
    console.log('error in connecting db',error);
    
   }
}

export default connectDb