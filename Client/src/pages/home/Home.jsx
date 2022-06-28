import React from 'react'
import PostSide from '../../components/Home/PostSide/PostSide'
import ProfileSide from '../../components/Home/ProfileSide/ProfileSide'
import RightSide from '../../components/Home/RightSide/RightSide'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSide/>
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home