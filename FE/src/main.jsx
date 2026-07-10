import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ProfileSaved from "./page/profile/Saved/ProfileSaved.jsx";
import ProfilePosts from "./page/profile/Posts/ProfilePosts.jsx";
import ProfileTagged from "./page/profile/Tagged/ProfileTagged.jsx";
import ProfileAllPosts from "./page/profile/Saved/ProfileAllPosts.jsx";
import Register from "./page/auth/Register.jsx";
import Settings from "./page/edit/Settings.jsx";
import EditProfile from "./page/edit/EditProfile.jsx";
import Notifications from "./page/edit/Notifications/Notifications.jsx";
import PushNotifications from "./page/edit/Notifications/PushNotifications";
import PostModalWrapper from "./components/PostModalWrapper.jsx";
import PostDetailPage from "./page/post/PostDetailPage.jsx";

document.documentElement.classList.add("dark");

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
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
            <Route path="saved" element={<ProfileSaved />} />
            <Route path="tagged" element={<ProfileTagged />} />
          </Route>
          <Route path="/users/:id" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="tagged" element={<ProfileTagged />} />
          </Route>
          <Route
            path="profile/saved/all-posts"
            element={<ProfileAllPosts />}
          />
          <Route path="/settings" element={<Settings />}>
            <Route path="edit" element={<EditProfile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route
              path="push-notifications"
              element={<PushNotifications />}
            />
          </Route>
          {/* Post detail page when accessed directly */}
          <Route path="/p/:id" element={<PostDetailPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Render modal if backgroundLocation state exists */}
      {backgroundLocation && (
        <Routes>
          <Route path="/p/:id" element={<PostModalWrapper />} />
        </Routes>
      )}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);

