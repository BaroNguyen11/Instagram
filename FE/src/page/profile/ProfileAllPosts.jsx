import { Bookmark } from "lucide-react";


const ProfileAllPosts = () => {
  return (
    <div className="flex justify-center gap-2 flex-col items-center mt-6 cursor-pointer">
      <div className="w-15 h-15 border rounded-full relative flex justify-center items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Bookmark className="w-10 h-10" strokeWidth={1} />
        </div>
      </div>
      <h2 className="text-3xl font-bold">Share Photos</h2>
      <div>When you share photos, they will appear on your profile.</div>
    </div>
  );
};

export default ProfileAllPosts;
