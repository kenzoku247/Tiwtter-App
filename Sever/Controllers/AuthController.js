import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new User
export const registerUser = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;
    let newUserName = username.toLowerCase().replace(/ /g, '')

    const user_name = await UserModel.findOne({username: newUserName})
    if(user_name) return res.status(400).json({msg: "This user already exists."})

    const user_email = await UserModel.findOne({email})
    if(user_email) return res.status(400).json({msg: "This email already exists."})

    if(password.length < 6)
    return res.status(400).json({msg: "Password must be at least 6 characters."})

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new UserModel({
      username: newUserName,
      password: passwordHash,
      email,
      firstname,
      lastname,
    });

    const access_token = createAccessToken({id: newUser._id})
    const refresh_token = createRefreshToken({id: newUser._id})

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/auth/refresh_token',
        maxAge: 30*24*60*60*1000 // 30days
    })
  
    await newUser.save();

    res.json({
      msg: 'Register Success!',
      access_token,
      user: {
          ...newUser._doc,
          password: ''
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// login User

export const loginUser = async (req, res) => {
    try {
      const {username, password} = req.body
      
      const user = await UserModel.findOne({username})
      .populate("followers following", "email firstname lastname followers following")

      if(!user) return res.status(400).json({msg: "This user does not exist."})
      
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

      const access_token = createAccessToken({id: user._id})
      const refresh_token = createRefreshToken({id: user._id})

      res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: '/auth/refresh_token',
          maxAge: 30*24*60*60*1000 // 30days
      })

      res.json({
          msg: 'Login Success!',
          access_token,
          user: {
              ...user._doc,
              password: ''
          }
      })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req,res) => {
  try {
    res.clearCookie('refreshtoken', {path: '/auth/refresh_token'})
    return res.json({msg: "Logged out!"})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

export const generateAccessToken = async (req,res) => {
  try {
    const rf_token = req.cookies.refreshtoken
    if(!rf_token) return res.status(400).json({msg: "Please login now."})

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
        if(err) return res.status(400).json({msg: "Please login now."})

        const user = await UserModel.findById(result.id).select("-password")
        .populate('followers following', 'username followers following')

        if(!user) return res.status(400).json({msg: "This does not exist."})

        const access_token = createAccessToken({id: result.id})

        res.json({
            access_token,
            user
        })
    })
    
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}