import React from 'react'
import { useSelector } from 'react-redux'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home = () => {
  const tokenValue = useSelector((state) => state.auth.token)
  const userValue = useSelector((state) => state.auth.user)
  console.log(tokenValue);
    console.log(userValue);
  return (
    
    <div className="Home">
      
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home