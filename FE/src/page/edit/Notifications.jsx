import { Search } from "lucide-react";

const Notifications = () => {
  return (
    <>
      <h2 className="font-bold">Notifications</h2>
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3/10 top-9 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          className="block w-150 text-sm p-2.5 mx-auto px-9 rounded-full bg-[rgba(255,255,255,0.1)] text-white focus:outline-none "
        />
      </div>
    </>
  );
};
export default Notifications;
