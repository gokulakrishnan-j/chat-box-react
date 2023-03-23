import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {API} from '../../global/Connect'
import "./home.css"
import LogoutIcon from '@mui/icons-material/Logout';


function Home() {

  const {username} = useParams()
  
  const navigate = useNavigate()
  const [name,setName]= useState('')

  useEffect(()=>{
    fetch(`${API}/user/token/${username}`)
    .then((data)=>data.json())
    .then((value)=>localStorage.setItem("token",value.my_token))
},[username])

const logout=()=>{
  fetch(`${API}/user/logout/${username}`,{
    method:'DELETE',
    headers:{my_token:localStorage.getItem("token")}
  })
  .then(()=>(navigate('/user/signin')))
  .then(()=>localStorage.removeItem("token"))
}

  return (
    <div className='home'>
      <div>
        <p className='userNmae'>{username}</p>
        <button className='logout' onClick={()=>logout()}>Logout <LogoutIcon/> </button>
      </div>
      <input value={name} placeholder={'User Name'} className="userName" onChange={(e)=>setName(e.target.value)} />
         <div>
          <div className='createAndJoinRoomBox'>
<span className='createRoom' onClick={()=>name !== ''?navigate(`/chat/create-room/${username}/${name}`):alert('Fill The Username')}>Create room to chat</span>
</div>
<div className='createAndJoinRoomBox'>
<span className='joinRoom'  onClick={()=>name !== ''?navigate(`/chat/join-room/${username}/${name}`):alert('Fill The Username')}>Join room to chat</span>
</div>
         </div>
         <div>
          <button className='homeBackButton' onClick={()=>navigate(-1)}>BACK</button>
        </div>
    </div>
  )
}

export default Home