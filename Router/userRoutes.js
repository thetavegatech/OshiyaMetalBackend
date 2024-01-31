const express = require("express")
const { authUser, registerUser, logoutUser, getUserProfile,
 updateUserProfile } = require("../Controller/userController")
 const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/",  registerUser)
router.post("/auth",  authUser)
router.post("/logout",  logoutUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)


module.exports = router;