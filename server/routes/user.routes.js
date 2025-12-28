import express from "express"
import { protect } from "../middlewares/auth.middleware.js" 
import { getUserCampaigns } from "../controllers/campaign.controller.js"

const router = express.Router()

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  })
})
router.get("/campaigns", getUserCampaigns)

export default router
