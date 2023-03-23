import './App.css';
import {Routes,Route, Navigate} from "react-router-dom"
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Home from './components/home/Home';
import io from 'socket.io-client'
import JoinRoom from './components/joinRoom/JoinRoom';
import CreateRoom from './components/createRoom/CreateRoom';
import { API } from './global/Connect';

const socket = io.connect(API)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/user/signup' element={<Signup/>}/>
        <Route path='/user/signin' element={<Signin/>}/>
        <Route path='*' element={<Navigate to="/user/signin"/>}/>
        <Route path='/user/:username' element={<Home />}/>
        <Route path='/chat/join-room/:username/:name' element={<JoinRoom socket={socket}/>}/>
        <Route path='/chat/create-room/:username/:name' element={<CreateRoom socket={socket}/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
