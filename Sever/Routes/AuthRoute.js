import express from "express";
import { loginUser, registerUser, logoutUser, generateAccessToken } from "../Controllers/AuthController.js";
// import auth from "../middleware/auth.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.post('/refresh_token',generateAccessToken)


export default router