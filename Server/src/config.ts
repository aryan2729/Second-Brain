import dotenv from "dotenv";
dotenv.config();

export const MONGO_URL= process.env.MONGO_URL as string ;            
export const JWT_SECRET = process.env.JWT_SECRET as string ; 
export const FRONTEND_URL = process.env.FRONTEND_URL as string ;         