import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <>
      <div className="max-w-150 mx-auto py-10">
        <div className="flex items-center pb-10 gap-2">
          <h2 className="font-bold text-2xl ">Notifications</h2>
        </div>
        <div className="border rounded-lg h-25 border-[rgba(256,256,256,0.15)] flex flex-col justify-center px-2">
         <Link to='/settings/push-notifications'>
          <div className="flex items-center gap-2 px-2 py-2 justify-between hover:bg-[rgba(256,256,256,0.15)] cursor-pointer rounded-md">
            <span className="text-sm">Push notifications</span>
            <ChevronRight strokeWidth={1.5} />
          </div>
         </Link>
        <Link to='/email-notifications'>
          <div className="flex items-center gap-2 px-2 py-2 justify-between hover:bg-[rgba(256,256,256,0.15)] cursor-pointer rounded-md">
            <span className="text-sm">Email notifications</span>
            <ChevronRight strokeWidth={1.5} />
          </div>
        </Link>
        </div>
      </div>
    </>
  );
};
export default Notifications;
