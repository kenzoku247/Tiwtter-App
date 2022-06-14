import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../../redux/slices/auth";
import "./Auth.css";

const Login = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    // const tokenValue = useSelector((state) => state.auth.token)
    // const userValue = useSelector((state) => state.auth.user)
    // const { isLoggedValue } = useSelector((state) => state.auth)

    const dispatch = useDispatch();


    const initialValues = {
        username: "",
        password: "",
      };
    const [userData, setUserData] = useState(initialValues)
    const { username, password } = userData

    // useEffect(() => {
    //     console.log(isLoggedValue)
    //     if(tokenValue) navigate("/")
        
    // }, [tokenValue, navigate])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(login(userData))
        navigate("/")

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
            <h3>Sign in</h3>


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
                        type="password"
                        onChange={handleChangeInput} value={password}
                        className="infoInput"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    
                </div>


                <button className="button infoButton" type="submit">Signin</button>

                <p className="my-2">
                    Create a new account. <Link to="/register" style={{color: "crimson"}}>Sign Up</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
