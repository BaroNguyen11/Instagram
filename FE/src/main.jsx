import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./page/home/Homepage.jsx";
import Message from "./page/message/Message.jsx";
import Notify from "./page/notify/Notify.jsx";
import UploadPost from "./page/upload/UploadPost.jsx";
import Profile from "./page/profile/Profile.jsx";
import SearchPage from "./page/search/SearchPage.jsx";
import Explore from "./page/explore/Explore.jsx";
import Login from "./page/auth/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProfileSaved from "./page/profile/ProfileSaved.jsx";
import ProfilePosts from "./page/profile/ProfilePosts.jsx";
import ProfileTagged from "./page/profile/ProfileTagged.jsx";
import ProfileAllPosts from "./page/profile/ProfileAllPosts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />

            <Route path="/messages" element={<Message />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notify />} />
            <Route path="/create" element={<UploadPost />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfilePosts />} />
              <Route path="saved" element={<ProfileSaved />}>
                <Route path="all-posts" element={<ProfileAllPosts />} />
              </Route>
              <Route path="tagged" element={<ProfileTagged />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
