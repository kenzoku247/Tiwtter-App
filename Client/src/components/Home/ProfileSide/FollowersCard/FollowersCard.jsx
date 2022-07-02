import React, { useState } from 'react'
import "./FollowersCard.css"
import { Followers } from '../../../Data/FollowersData'
import Users from '../../../Users/Users'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../../../redux/api/UserRequest'
const FollowersCard = () => {
  const [persons,setPersons] = useState([])
  const { user } = useSelector((state) => state.authReducer.authData)
  useEffect(()=> {
    const fetchPersons = async() => {
        const {data} = await getAllUsers();
        setPersons(data)
        
    }
    fetchPersons()
  },[])
  return (
    <div className='FollowersCard'>
        <h3>People may you know</h3>

        {persons.map((person, id)=> {
          if (person._id !== user._id) {

            return (
                <Users person = {person} key = {id}/>
            )
          }
        })}
    </div>
  )
}

export default FollowersCard