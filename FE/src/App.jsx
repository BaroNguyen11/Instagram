import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import usePost from "./hooks/usePost";
function App() {
  const { posts } = usePost();
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-20 hover:w-64 transition-all duration-300 ease-in-out   overflow-hidden h-screen sticky top-0 self-start">
        <Sidebar />
      </aside>

      <main className="flex-1">
        <Outlet context={{ posts }} />
      </main>
    </div>
  );
}

export default App;
