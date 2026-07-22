import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const Homepage = lazy(() => import("./page/home/Homepage.jsx"));
const Message = lazy(() => import("./page/message/Message.jsx"));
const Notify = lazy(() => import("./page/notify/Notify.jsx"));
const UploadPost = lazy(() => import("./page/upload/UploadPost.jsx"));
const Profile = lazy(() => import("./page/profile/Profile.jsx"));
const SearchPage = lazy(() => import("./page/search/SearchPage.jsx"));
const Explore = lazy(() => import("./page/explore/Explore.jsx"));
const Login = lazy(() => import("./page/auth/Login.jsx"));
const ProfileSaved = lazy(() => import("./page/profile/Saved/ProfileSaved.jsx"));
const ProfilePosts = lazy(() => import("./page/profile/Posts/ProfilePosts.jsx"));
const ProfileTagged = lazy(() => import("./page/profile/Tagged/ProfileTagged.jsx"));
const ProfileAllPosts = lazy(() => import("./page/profile/Saved/ProfileAllPosts.jsx"));
const Register = lazy(() => import("./page/auth/Register.jsx"));
const Settings = lazy(() => import("./page/edit/Settings.jsx"));
const EditProfile = lazy(() => import("./page/edit/EditProfile.jsx"));
const Notifications = lazy(() => import("./page/edit/Notifications/Notifications.jsx"));
const PushNotifications = lazy(() => import("./page/edit/Notifications/PushNotifications"));
const PostModalWrapper = lazy(() => import("./components/posts/PostModalWrapper.jsx"));
const PostDetailPage = lazy(() => import("./page/post/PostDetailPage.jsx"));

document.documentElement.classList.add("dark");

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-10 h-10 border-4 border-t-[#0095f6] border-zinc-750 rounded-full animate-spin"></div>
        </div>
      }
    >
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
    </Suspense>
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

