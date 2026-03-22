import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'

import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import agencyRouter from "./routes/agencyRoute.js"
import propertyRouter from "./routes/propertyRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import connectCloudinary from "./config/cloudinary.js"

const app = express()
app.use(cors())
await connectDB()
await connectCloudinary()

// middlewarre
app.use(express.json())
app.use(clerkMiddleware())

// Api to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks)

// define api routes
app.use("/api/user", userRouter)
app.use("/api/agencies", agencyRouter)
app.use("/api/properties", propertyRouter)
app.use("/api/bookings", bookingRouter)

app.get('/', (req, res) => {
    res.send("server connected successfullyyy")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server is running on port ${port}`))