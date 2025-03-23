import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

// configurations 

app.use(express.json({limit: "16kb"})) // data from form (input specifically from user)
app.use(express.urlencoded({extended: true , limit:"16kb"})) // data from url
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import router from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users" , router)


export {app}