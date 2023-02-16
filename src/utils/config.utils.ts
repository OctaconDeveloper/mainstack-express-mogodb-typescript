import * as dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URL = process.env.DB_URL
export const PORT = process.env.PORT || 3040
export const APP_NAME = process.env.APP_NAME || "Mainstack"

// 'mongodb://dalenguyen:123123@localhost:27017/CRMdb'