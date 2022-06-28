import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/Profile/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/Home/ProfileSide/ProfileCard/ProfileCard'
import PostSide from '../../components/Home/PostSide/PostSide'
import RightSide from '../../components/Home/RightSide/RightSide'

const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft/>
        <div className="Profile-center">
          <ProfileCard/>
          <PostSide/>
        </div>
        <RightSide/>
    </div>
  )
}

export default Profile