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
      
      {/* Mobile Bottom Navigation Container (outside flex to prevent layout offset) */}
      <div className="md:hidden">
        <Sidebar refetchPosts={refetchPosts} />
      </div>

      <div className="flex min-h-screen bg-black text-white">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-20 hover:w-64 transition-all duration-300 ease-in-out z-9999 overflow-hidden h-screen fixed left-0 top-0 self-start">
          <Sidebar refetchPosts={refetchPosts} />
        </aside>

        <main className="flex-1 min-w-0 ml-0 md:ml-25 pb-20 md:pb-0">
          <Outlet context={{ posts, refetchPosts, page, setPage, hasMore, loading }} />
        </main>
      </div>
    </>
  );
}

export default App;
