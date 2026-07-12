import mongoose from "mongoose"
import { env } from "./env.js"

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(env.mongoUri);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log("MongoDB Connection Failed ", err);
        process.exit(1);
    }
};