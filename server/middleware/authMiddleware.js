import User from "../models/User.js"


// middleware to chek if user is authenticated or not
export const authUser = async(req, res, next) => {
    const { userId } = req.auth()
    if (!userId) {
        return res.json({ success: false, message: "Unauthorized" })
    } else {
        const user = await User.findById(userId)
        req.user = user
        next()
    }
}