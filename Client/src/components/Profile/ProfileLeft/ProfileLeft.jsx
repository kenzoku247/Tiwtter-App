import React from 'react'
import FollowersCard from '../../Home/ProfileSide/FollowersCard/FollowersCard'
import LogoSearch from '../../Home/ProfileSide/LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'
import '../../Home/ProfileSide/ProfileSide.css'

const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft