import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Settings = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-[30%] border-b md:border-b-0 md:border-r border-zinc-800">
          <Sidebar />
        </div>
        <div className="w-full md:w-[70%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Settings;
