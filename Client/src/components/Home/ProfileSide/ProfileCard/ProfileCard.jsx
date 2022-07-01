import React from 'react'
import './ProfileCard.css'
import Cover from '../../../../img/cover.jpg'
import Profile from '../../../../img/profileImg.jpg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileCard = ({location}) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const posts = useSelector((state)=>state.postReducer.posts);

    const ProfilePage = false;
  return (
    <div className='ProfileCard'>
        <div className="ProfileImages">
            <img src={user.coverPicture ? serverPublic + user.coverPicture  : serverPublic + "defaultCover.jpg"} alt="" />
            <img src={user.profilePicture ? serverPublic + user.profilePicture  : serverPublic + "defaultProfile.jpg"} alt="" />
        </div>   
        <div className="ProfileName">
            <span>{user.firstName} {user.lastName}</span>
            <span>{user.worksAt ? user.worksAt : "Wite about yourself"}</span>
        </div>

        <div className="FollowStatus">
            <hr />
            <div>
                <div className="Follow">
                    <span>{user.followers.length}</span>
                    <span>{user.followers.length > 1 ? "Followings" : "Following"}</span>
                </div>
                <div className="vl">
                
                </div>
                <div className="Follow">
                    <span>{user.followings.length}</span>
                    <span>{user.followings.length > 1 ? "Followers" : "Follower"}</span>
                </div>

                {location === "profilePage" && (
                    <>
                        <div className="vl"></div>
                            <div className="follow">
                                <span>{
                                posts.filter((post)=>post.userId === user._id).length
                                }</span>
                                <span> {posts.filter((post)=>post.userId === user._id).length > 1 ? "Posts" : "Post"}</span>
                        </div>{" "}
                    </>
                )}
            </div>
            <hr />    
        </div> 
        {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  )
}

export default ProfileCard