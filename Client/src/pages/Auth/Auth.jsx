import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../../redux/actions/AuthAction'

const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.authReducer.loading)
    
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false)

    const initialState = {
        firstName: "", 
        lastName: "", 
        password: "", 
        confirmPassword: "", 
        username: ""
    }

    const [data, setData] = useState(initialState)

    const [confirmPass, setConfirmPass] = useState(true)

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        setConfirmPass(true);
        e.preventDefault()

        if(isSignUp) {
            data.password === data.confirmPassword 
            ? dispatch(signup(data, navigate)) 
            : setConfirmPass(false)
        } else {
            dispatch(login(data, navigate))
        }
    }

    const resetPForm = () => {
        setData(initialState);
        setConfirmPass(confirmPass);
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
            <form action="" className="InfoForm AuthForm" onSubmit={handleSubmit}>
                <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>
                {isSignUp && 
                    <div>
                        <input type="text" 
                        placeholder='First Name' 
                        className='InfoInput'
                        name='firstName'
                        onChange={handleChange}
                        value={data.firstName}
                        />
                        <input type="text" 
                        placeholder='Last Name' 
                        className='InfoInput'
                        name='lastName'
                        onChange={handleChange}
                        value={data.lastName}
                        />
                    </div>
                }
                    
                <div>
                    <input type="text" 
                    placeholder='Username' 
                    className='InfoInput'
                    name='username'
                    onChange={handleChange}
                    value={data.username}
                    />
                </div>
                <div>
                    <input type="password" 
                    placeholder='Password' 
                    className='InfoInput'
                    name='password'
                    onChange={handleChange}
                    value={data.password}
                    />
                    {isSignUp &&
                        <input type="password" 
                        placeholder='Confirm Password' 
                        className='InfoInput'
                        name='confirmPassword'
                        onChange={handleChange}
                        value={data.confirmPassword}
                        />
                    }
                    
                </div>
                
                <span style={{
                    display: confirmPass ? "none" : "block", 
                    color: 'red', 
                    fontSize: '12px',
                    alignSelf: 'flex-end',
                    marginRight: '5px'}}>
                    * Confirm Password is not same
                </span>
                

                <div>
                    <span style={{fontSize: '12px', cursor: 'pointer'}} 
                        onClick = { () => {
                            resetPForm()
                            setIsSignUp((prev) => !prev); 
                        }}
                    >
                        {isSignUp ? "Already have an account. Login now!" : "Don't have an account. Sign up now!"}
                    </span>
                </div>
                <button 
                    className="button InfoButton" 
                    type='submit' 
                    disabled={loading}
                >
                    {loading ? "Loading..." : isSignUp ? "Signup" : "Login"}
                </button>
            </form>
        </div>

    </div>
  )
}



export default Auth