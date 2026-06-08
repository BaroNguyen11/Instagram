import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-20 hover:w-64 transition-all duration-300 ease-in-out border-r border-gray-800 overflow-hidden h-screen sticky top-0 self-start">
        <Sidebar />
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
