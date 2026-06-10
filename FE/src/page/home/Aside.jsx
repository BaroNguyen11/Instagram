import { useAuth } from "../../context/AuthContext";

const Aside = () => {
  const {isAuthenticated, user} = useAuth()
  return (
    <>
      <aside className="hidden lg:block w-90 py-10 px-8">
        <div className="sticky top-10">
        {isAuthenticated && (
            <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s"
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <div className="font-bold text-sm">{user?.username}</div>
                <div className="text-sm text-gray-400 ">{user?.fullname}</div>
              </div>
            </div>
            <button className="text-blue-300 text-xs font-bold cursor-pointer">
              Switch
            </button>
          </div>
        )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-400 font-bold">Gợi ý cho bạn</h2>
            <button className=" text-xs font-bold cursor-pointer">
              See All
            </button>
          </div>
         {/* {user.map((item)=>(
             <div className="flex items-center justify-between gap-2 mb-1" key={item.id}>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold">{item.username}</div>
                  <div className="text-gray-400 text-xs">Suggest for you</div>
                </div>
              </div>
              <button className="text-blue-400 text-xs font-bold cursor-pointer">
                Follow
              </button>
            </div>
         ))} */}
        </div>
      </aside>
    </>
  );
};
export default Aside;
