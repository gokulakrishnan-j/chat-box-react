import React,{useEffect, useState} from 'react'
import { API } from '../../global/Connect'
import { useNavigate,useParams } from 'react-router-dom'
import Chat from '../chat/Chat'
import './CreateRoom.css'

function CreateRoom({socket}) {
    const {name} = useParams()
    const navigate = useNavigate()
    const [roomName,setRoomName] = useState('')
    const [room,setRoom] = useState('')
    const [showRoom,setShowRoom] = useState(false)
    const [copy,setCopy] = useState("copy")

    var names = name.toUpperCase()

var admin = names

    const joinRoom=()=>{
if(roomName && room){
  socket.emit('join-room',room.roomId);
  setShowRoom(true)
}else{
  alert("Fill the Room Name")
}
    }

    useEffect(()=>{
      fetch(`${API}/autogenpassword`,{
        headers:{'my_token':localStorage.getItem("token"),}
      })
      .then((data)=>data.json())
      .then((value)=>setRoom(value))
    },[])

    const handleCopy = () =>{
      navigator.clipboard.writeText(room.roomId);
      setCopy("copied")
    }

  return (
    <div >
         { !showRoom ?
        <div className='createRoomBox'>
            <div>
                <p className='name'>{names}</p>
            </div>
            <input className='createRoomInput' placeholder='Room Name' onChange={(e)=>setRoomName(e.target.value)} />
            <div className='roomId'>
            <p className='roomIdName'>{room.roomId}</p>
            <h5 className='copy' onClick={()=>handleCopy()}>{copy}</h5>
            </div>
            <div>
                <button className='createRoomButton' onClick={joinRoom}>Create</button>
            </div>
            <div >
              <button className='createRoomBackButton' onClick={()=>navigate(-1)}>BACK</button>
            </div>
        </div>
        : <Chat socket={socket}  name={names} admin={admin} roomName={roomName} room={room.roomId}/>}
    </div>
  )
}

export default CreateRoom