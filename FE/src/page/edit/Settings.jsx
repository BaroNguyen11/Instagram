import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Settings = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[30%]">
          <Sidebar />
        </div>
        <div className="w-[70%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Settings;
