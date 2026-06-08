import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './page/home/Homepage.jsx'
import Message from './page/message/Message.jsx'
import Notify from './page/notify/Notify.jsx'
import UploadPost from './page/upload/UploadPost.jsx'
import Profile from './page/profile/Profile.jsx'
import Search from './page/search/Search.jsx'
import Explore from './page/explore/Explore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
            <Route index element={<Homepage />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notify />} />
            <Route path="/create" element={<UploadPost />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
