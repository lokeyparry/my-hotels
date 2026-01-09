import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

const app = express()
app.use(cors())
await connectDB()
    // middlewarre
app.use(express.json)
app.use(clerkMiddleware())

// Api to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks)

app.get('/', (req, res) => {
    res.send("server connected successfully")
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`server is running on port ${port}`))