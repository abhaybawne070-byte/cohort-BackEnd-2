import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONFO_URI){
    throw new Error("MONGO_URI is not defined in environment variables")
}


export const config = {
    MONFO_URI:process.env.MONFO_URI
}