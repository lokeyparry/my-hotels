import User from "../models/User.js";
import { Webhook } from "svix"

const clerkWebhooks = async(req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
            // get headers
        const headers = {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            }
            // verifying headers
        await whook.verify(JSON.stringify(req.body), headers)

        // getting data from request bdy
        const { data, type } = req.body

        // switch case for different types of event
        switch (type) {
            case "user.created":
                {
                    const userData = {
                        _id: data.id,
                        username: data.first_name + " " + data.last_name,
                        email: data.email_addresses[0].email_address,
                        image: data.image_url,
                    };
                    await User.create(userData)
                    break;
                }
            case "user.updated":
                {
                    const userData = {
                        _id: data.id,
                        username: data.first_name + " " + data.last_name,
                        email: data.email_addresses[0].email_address,
                        image: data.image_url,
                    };
                    await User.findByIdAndUpdate(data.id, userData)
                    break;
                }
            case "user.deleted":
                {

                    await User.findByIdAndDelete(data.id)
                    break;
                }

            default:
                break;
        }
        res.json({ success: true, message: "webhook received successfully" })
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).json({ success: false, message: "webhook failed", error: error.message })
    }
}

export default clerkWebhooks;