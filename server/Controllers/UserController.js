import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Get a User
export const getUser = async(req,res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if(user) {
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("No such user exists!")
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Update a User
export const updateUser = async(req,res) => {
    const id = req.params.id;
    const {_id, currentUserAdmin, password} = req.body

    if(id === _id) {
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
            
            const token = jwt.sign(
                {username: user.username, id: user._id},
                process.env.JWT_KEY, 
                {expiresIn: "1h"}
            )
            res.status(200).json({user, token})
            // console.log(user, token);

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } else {
        res.status(403).json("Access Denied! You can update only your own Account.");
    }
}

// Delete a User
export const deleteUser = async(req,res) => {
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body

    if(id===currentUserId || currentUserAdminStatus) {
        try {

            await UserModel.findByIdAndDelete(id,);

            res.status(200).json("User deleted successfully!")

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    } else {
        res.status(403).json("Access Denied! You can delete only your own Account.");
    }
}

// Follow a User
export const followUser = async(req,res) => {
    const id = req.params.id;
    const {currentUserId} = req.body

    if(id===currentUserId) {
        res.status(403).json("Action forbidden!")
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {followings: id}})
                res.status(200).json('User followed!')
            } else {
                res.status(403).json("User is already followed by you!")
            }

           

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    
    }
}

// UnFollow a User
export const unFollowUser = async(req,res) => {
    const id = req.params.id;
    const {currentUserId} = req.body

    if(id===currentUserId) {
        res.status(403).json("Action forbidden!")
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {followings: id}})
                res.status(200).json('User Unfollowed!')
            } else {
                res.status(403).json("User is not already followed by you!")
            }

           

        } catch (error) {
            res.status(500).json({message: error.message})
        }
    
    }
}

