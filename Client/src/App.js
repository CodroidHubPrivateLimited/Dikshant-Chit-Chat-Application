import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Register from './pages/Register Page/Register'
// import Register from './pages/Register Page/Register'
// import Register from './pages/Register/Register';
import Register from './pages/Register Page/register'
import Login from './pages/Login/login'
import Chat from './pages/Chit Chat/chat'
export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
    </Routes>
  </BrowserRouter>
}
