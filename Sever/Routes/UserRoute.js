import express from "express";
import auth from "../middleware/auth.js";
import { deleteUser, followUser, getUser, unFollowUser, updateUser, searchUser,suggestionUser } from "../Controllers/UserController.js";


const router = express.Router()


router.get('/search', auth, searchUser)
router.get('/user/:id',auth, getUser)
router.patch('/user/',auth, updateUser)
router.delete('/user/:id',auth, deleteUser)
router.patch('/user/:id/follow',auth, followUser)
router.patch('/user/:id/unfollow',auth, unFollowUser)
router.get('/user/suggestionsUser', auth, suggestionUser)
export default router;