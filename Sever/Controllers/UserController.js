import UserModel from "../Models/userModel.js"

// search UserModel
export const searchUser = async (req, res) => {
  try {
    
    const users = await UserModel.find({username: {$regex: req.query.username}})
    .limit(10).select("firstname lastname username avatar")
    
    res.json({users})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id).select('-password')
    .populate("followers following", "-password");
    if(!user) return res.status(400).json({msg: "User does not exist."})


    res.json({user})

  } catch (error) {
    return res.status(500).json({msg: err.message})
  }
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, profilePicture, coverPicture,about,livesIn,worksAt,relationship} = req.body
    if(!firstname && !lastname) return res.status(400).json({msg: "Please add your full name."})

    await UserModel.findOneAndUpdate({_id: req.user._id}, {
      firstname, lastname, profilePicture, coverPicture,about,livesIn,worksAt,relationship
    })

    res.json({msg: "Update Success!"})

} catch (err) {
    return res.status(500).json({msg: err.message})
}
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  try {
    const user = await UserModel.find({_id: req.params.id, followers: req.user._id})
    if(user.length > 0) return res.status(500).json({msg: "You followed this user."})

    const newUser = await UserModel.findOneAndUpdate({_id: req.params.id}, { 
        $push: {followers: req.user._id}
    }, {new: true}).populate("followers following", "-password")

    await UserModel.findOneAndUpdate({_id: req.user._id}, {
        $push: {following: req.params.id}
    }, {new: true})

    res.json({newUser})

} catch (err) {
    return res.status(500).json({msg: err.message})
}
};

// UnFollow a UserModel
export const unFollowUser = async (req, res) => {
  try {

    const newUser = await UserModel.findOneAndUpdate({_id: req.params.id}, { 
        $pull: {followers: req.user._id}
    }, {new: true}).populate("followers following", "-password")

    await UserModel.findOneAndUpdate({_id: req.user._id}, {
        $pull: {following: req.params.id}
    }, {new: true})

    res.json({newUser})

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
};

// suggestionUser
export const suggestionUser = async (req, res) => {
  try {
    const newArr = [...req.user.following, req.user._id]
    const num  = req.query.num || 10
    const users = await UserModel.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
    ]).project("-password")

    return res.json({
        users,
        result: users.length
    })

  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
};
