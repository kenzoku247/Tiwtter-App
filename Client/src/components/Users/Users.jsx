import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/UserAction';

const Users = ({person }) => {
    const dispatch = useDispatch()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useSelector((state)=>state.authReducer.authData)

    const [followings, setFollowings] = useState(
        person.followers.includes(user._id)
      );
    
    const handleFollow = () => {
        followings
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
        setFollowings((prev) => !prev);
    }

  return (
    <div className="follower">
        <div>
        <img src={
            person.profilePicture
            ? serverPublic + person.profilePicture
            : serverPublic + "defaultProfile.jpg"
        } alt="" className='followerImage'/>
        <div className="Name">
            <span>
            {person.firstName} {person.lastName}
            </span>
            <span>
            @{person.username}
            </span>
        </div>
        </div>
        <button
            className={
                followings ? "button fc-button UnfollowButton" : "button fc-button"
            }
            onClick={handleFollow}
        >
        {followings ? "Unfollow" : "Follow"}
      </button>
    </div>
  )
}

export default Users