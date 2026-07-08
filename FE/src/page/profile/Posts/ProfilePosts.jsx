import ModalUpload from "@/page/upload/ModalUpload";
import useProfile from "@/hooks/useProfile";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const ProfilePosts = () => {
  const { posts, refetchPosts } = useOutletContext();
  const { profile } = useProfile();
  const [click, setClick] = useState(false);

  const myPosts = posts.filter((post) => post.author?._id === profile?.User?._id);

  return (
    <>
      {myPosts.length === 0 ? (
        <div className="flex justify-center gap-2 flex-col items-center mt-6 cursor-pointer">
          <div
            className="w-15 h-15 border rounded-full border-gray-400 relative flex justify-center items-center"
            onClick={() => setClick(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Camera className="w-10 h-10" strokeWidth={1} />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Share Photos</h2>
          <div>When you share photos, they will appear on your profile.</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 md:gap-4 pb-10 ">
          {myPosts.map((post) => (
            <div key={post._id} className="aspect-square">
              <img
                src={post?.images[0]?.url}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {click && (
        <ModalUpload
          onClose={() => setClick(false)}
          refetchPosts={refetchPosts}
        />
      )}
    </>
  );
};

export default ProfilePosts;
