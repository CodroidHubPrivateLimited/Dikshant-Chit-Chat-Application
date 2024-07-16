import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Register from './pages/Register Page/Register'
// import Register from './pages/Register Page/Register'
// import Register from './pages/Register/Register';
import Register from './pages/Register Page/register'
import Login from './pages/Login/login'
import Chat from './pages/Chit Chat/chat'
// import Avatars from './components/Avatars/Avatars'
import Avatars from './components/Avatars/avatars'
export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
      <Route path="/avatars" element={<Avatars/>}></Route>
    </Routes>
  </BrowserRouter>
}
