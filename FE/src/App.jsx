import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import usePost from "./hooks/usePost";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { postService } from "./services/postService";
function App() {
  const { posts, page, setPage, hasMore, refetchPosts, loading } = usePost();

  return (
    <>
      <Toaster className="z-9999" />
      <div className="flex min-h-screen bg-black text-white">
        <aside className="w-20 hover:w-64 transition-all duration-300 ease-in-out z-9999 overflow-hidden h-screen fixed left-0 top-0 self-start">
          <Sidebar refetchPosts={refetchPosts} />
        </aside>

        <main className="flex-1 ml-25">
          <Outlet context={{ posts, refetchPosts, page, setPage, hasMore, loading }} />
        </main>
      </div>
    </>
  );
}

export default App;
