import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import usePost from "./hooks/usePost";
function App() {
  const { posts, refetchPosts } = usePost();
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-20 hover:w-64 transition-all duration-300 ease-in-out  overflow-hidden h-screen fixed left-0 top-0 self-start">
        <Sidebar refetchPosts={refetchPosts} />
      </aside>

      <main className="flex-1 ml-20">
        <Outlet context={{ posts }} />
      </main>
    </div>
  );
}

export default App;
