import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { adminRouter } from "./routes/adminRoute.js"

const app = express()
app.use(cors({
    origin: ["https://rbac-one-neon.vercel.app", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
))
app.use(cookieParser());
app.use(express.json())
app.use('/auth', adminRouter)
app.use(express.static('Public'))

const PORT = 8081
app.listen(PORT, () => {
    console.log(`App is listening on  port ${PORT}`)
})