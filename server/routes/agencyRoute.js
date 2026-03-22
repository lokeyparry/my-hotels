import express from "express"
import { authUser } from "../middleware/authMiddleware.js"
import { agencyReg } from "../controllers/agencyController.js"

const agencyRouter = express.Router()

// Define agency routes here (e.g., registration, profile, etc.)
agencyRouter.post('/', authUser, agencyReg /* authMiddleware, */ /* agencyReg */ )

export default agencyRouter