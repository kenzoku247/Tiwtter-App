import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {register} from '../../redux/slices/auth'
import "./Auth.css";
import axios from 'axios'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tokenValue = useSelector((state) => state.auth.token)
    const userValue = useSelector((state) => state.auth.user)

    const initialState = { 
        firstname: '',
        lastname: '', 
        username: '',
        email: '', 
        password: '', 
        cf_password: ''
    }
    const [userData, setUserData] = useState(initialState)
    const { firstname, lastname, username, email, password, cf_password } = userData



    useEffect(() => {
        if(tokenValue) navigate("/")
    }, [tokenValue, navigate])
    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
        console.log(userValue);
      };

    return (   
        <div className="a-right">
            <div className="Auth">
                <div className="a-left">
                    {/* <img src={Logo} alt="" /> */}
                    <div className="Webname">
                        <h1>ZKC Media</h1>
                        <h6>Explore the ideas throughout the world</h6>
                    </div>
                </div>
            </div>
            <form className="infoForm authForm" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <div>
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleChangeInput} value={firstname}
                    className="infoInput"
                    name="firstname"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleChangeInput} value={lastname}
                    className="infoInput"
                    name="lastname"
                />
            </div>

            <div>
                <input
                    type="text"
                    className="infoInput"
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                    name="username"
                    placeholder="Usernames"
                />
            </div>


            <div>
                <input
                    type="email"
                    className="infoInput"
                    onChange={handleChangeInput} value={email}
                    name="email"
                    placeholder="Email"
                />
            </div>

            <div>
                <input
                    type="password"
                    onChange={handleChangeInput} value={password}
                    className="infoInput"
                    name="password"
                    placeholder="Password"
                />
                <input
                    type="password"
                    onChange={handleChangeInput} value={cf_password}
                    className="infoInput"
                    name="cf_password"
                    placeholder="Confirm Password"
                />
            </div>

            <button className="button infoButton" type="submit">Signup</button>

            <p className="my-2">
                Already have an account? <Link to="/login" style={{color: "crimson"}}>Login Now</Link>
            </p>
            </form>
        </div>
    )
}

export default Register
