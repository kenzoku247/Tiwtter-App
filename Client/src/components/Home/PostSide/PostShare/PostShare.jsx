import React, { useState, useRef } from 'react'
import './PostShare.css'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../../../redux/actions/UploadAction'
import { Link } from 'react-router-dom'


const PostShare = () => {
    const loading = useSelector((state) => state.postReducer.uploading)
    const[image,setImage] = useState(null)
    const imageRef = useRef()
    const {user} = useSelector((state)=>state.authReducer.authData)
    const desc = useRef()
    const dispatch = useDispatch()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0]
            setImage(img)
        }
    }

    const resetShare = () => {
        setImage(null);
        desc.current.value = ""
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append("name", fileName);
            data.append("file", image);
            newPost.image = fileName;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        resetShare();
    }

  return (
    <div className='PostShare'>
        <Link to={`/profile/${user._id}`} >
            <img 
                src={
                    user.profilePicture
                        ? serverPublic + user.profilePicture
                        : serverPublic + "defaultProfile.jpg"
                }
                alt="Profile" 
            />
        </Link>
        <div>
            <input type="text" 
            ref = {desc}
            required
            placeholder="What's happening"/>
            <div className="PostOptions">
                <div className="Option"
                style={{color: "var(--photo)"}}
                onClick={()=>imageRef.current.click()}
                >
                    <UilScenery/>
                    Photo
                </div>                                                                      
                <div className="Option"
                style={{color: "var(--video)"}}
                >
                    <UilPlayCircle/>
                    Video
                </div>                                                                      
                <div className="Option"
                style={{color: "var(--location)"}}
                >
                    <UilLocationPoint/>
                    Location
                </div>                                                                      
                <div className="Option"
                style={{color: "var(--schedule)"}}
                >
                    <UilSchedule/>
                    Schedule
                </div>   
                <button 
                    className="button ps-button"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Share"}
                </button>
                <div style={ {display: "none"}}>
                    <input type="file" name="myImage" id="" ref={imageRef} onChange={onImageChange}/>    
                </div>                                                                   
            </div>
            {image && (
                <div className="PreviewImage">
                    <UilTimes onClick={()=>setImage(null)}/>
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )}

        </div>
    </div>
  )
}

export default PostShare