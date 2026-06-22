import { Bookmark, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileAllPosts = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-145 flex flex-col mt-10 h-screen relative">
        <div className="flex items-center gap-1 cursor-pointer" onClick={()=>navigate('/profile/saved')}>
          <ChevronLeft />
          <span>Saved</span>
        </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-100">
          <div className="flex justify-center gap-2 flex-col items-center mt-6 cursor-pointer">
          <div className="w-15 h-15 border rounded-full relative flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Bookmark className="w-10 h-8" strokeWidth={0.5} />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Start Saving</h2>
          <div>Save photos and videos to your collection.</div>
          <button className="text-blue-300 cursor-pointer">Add to collection</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileAllPosts;
