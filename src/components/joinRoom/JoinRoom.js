import React, { useState } from 'react'
import './JoinRoom.css'
import { useNavigate,useParams } from 'react-router-dom'
import Chat from '../chat/Chat'

function JoinRoom({socket}) {

    const navigate =useNavigate()
    const {name} = useParams()
    
    const [room,setRoom] = useState('')
    const [showRoom,setShowRoom] = useState(false)
var names = name.toUpperCase()
    const joinRoom=()=>{
        if(room){
          socket.emit('join-room',room);
        setShowRoom(true)
        }
            }

  return (
    <div>
        { !showRoom ?
        <div className='joinRoomBox'>
            <div>
                <p className='name'>{names}</p>
            </div>
        
            <div>
            <input className='joinRoomInput' placeholder='Room Id' onChange={(e)=>setRoom(e.target.value)} />
            </div>
            <div>
                <button className='joinRoomButton' onClick={joinRoom}>Join</button>
            </div>
            <div >
              <button className='joinRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
        </div>
        : <Chat socket={socket} name={names}   room={room}/>}
    </div>
  )
}

export default JoinRoom