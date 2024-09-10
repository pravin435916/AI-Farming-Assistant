import React from 'react'
import { Home } from './pages/Home'
import { About } from './pages/About'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Navbar } from './pages/Navbar'
import { Detection } from './pages/Detection'
import ChatBot from './component/ChatBot'
import { Feedback } from './pages/Feedback'
import Posts from './pages/Posts'
function App() {
  return (
    <>
    <BrowserRouter>
    {/* <Navbar/> */}
       <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/about' element={<About/>}/> */}
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/detect' element={<Detection/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
       </Routes>
       <ChatBot/>
    </BrowserRouter>
    </>
  )
}

export default App