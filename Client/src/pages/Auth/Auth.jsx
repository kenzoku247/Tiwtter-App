import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(false)

    const [data, setData] = useState({firstName: "", lastName: "", password: "", confirmPassword: "", username: ""})

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
  return (
    <div className='Auth'>
        {/* Left Side */}
        <div className="Auth-left">
            <img src={Logo} alt="" />
            <div className="WebName">
                <h1>Twitter</h1>
                <h6>Explore the ideas throughout the world</h6>

            </div>
        </div>

        {/* Right Side */}
        <div className="Auth-right">
            <form action="" className="InfoForm AuthForm">
                <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
                {isSignUp && 
                    <div>
                        <input type="text" 
                        placeholder='First Name' 
                        className='InfoInput'
                        name='firstName'
                        onChange={handleChange}
                        />
                        <input type="text" 
                        placeholder='Last Name' 
                        className='InfoInput'
                        name='lastName'
                        onChange={handleChange}
                        />
                    </div>
                }
                    
                <div>
                    <input type="text" 
                    placeholder='Username' 
                    className='InfoInput'
                    name='username'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="password" 
                    placeholder='Password' 
                    className='InfoInput'
                    name='password'
                    onChange={handleChange}
                    />
                    {isSignUp &&
                        <input type="password" 
                        placeholder='Confirm Password' 
                        className='InfoInput'
                        name='confirmPassword'
                        onChange={handleChange}
                        />
                    }
                    
                </div>

                <div>
                    <span style={{fontSize: '12px', cursor: 'pointer'}} 
                        onClick = { () => setIsSignUp((prev) => !prev)}>
                        {isSignUp ? "Already have an account. Login now!" : "Don't have an account. Sign up now!"}
                    </span>
                </div>
                <button className="button InfoButton" type='submit'>{isSignUp ? "Signup" : "Login"}</button>
            </form>
        </div>

    </div>
  )
}



export default Auth