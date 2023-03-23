import React, { useState,useEffect,useRef } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import './chat.css'
import SendIcon from '@mui/icons-material/Send';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ChatIcon from '@mui/icons-material/Chat';

function Chat({socket,roomName,room,admin,name}) {
  const navigate = useNavigate()
  const {username} = useParams()

  const [message,setMessage] = useState('')
  const [newChat,setNewChat] = useState([])
  const scrollDown = useRef(null)

  useEffect(()=>{
    socket.on('receive-message',datas =>{
        setNewChat(data=>[...data,datas])
    })

 
  },[socket])

  

  async function chats(){

  if(message !== ''){
    const messageData = {
        room:room,
        user:name,
        username:username,
        roomName:roomName,
        chat:message

    }
  
    await socket.emit('send-message',messageData)
    setNewChat(data=>[...data,messageData])
    setMessage('')
    
  }else{
    alert('Fill the text')
  }
  }

  useEffect(()=>{
    scrollDown.current?.scrollIntoView()
    
        },[newChat])

const leaveRoom =()=>{
  navigate(`/user/${username}`)
}
      
  return (
    <div className='chat'>
      
      
      <div>
        <button className='leaveRoom' onClick={()=>leaveRoom()}>Leave Room <MeetingRoomIcon/></button>
       </div>
    <div className='chatBox'>
    
      {newChat.map((msg,index)=>(msg.username === username?
        <p className='myChat' key={index}>
          
            
            <span className='msgOfPerson'>{msg.chat}</span>
          
        </p>:<p className='otherChat' key={index}>
       
      
            <span className='nameOfChat' >{msg.user}</span><br/>
            <span className='msgOfPerson' >{msg.chat}</span>
            
        </p>
      ))}
      <div ref={scrollDown}></div>
      </div>
      <hr/>
       
       <input rows={10} cols={30} className='inputForChat' value={message} onChange={(e)=>setMessage(e.target.value)} />
       <span className='sendButton' >{message?<SendIcon fontSize='large' onClick={()=>chats()}/>:<ChatIcon fontSize='large'/>}</span>
       
    </div>
  )
}

export default Chat
