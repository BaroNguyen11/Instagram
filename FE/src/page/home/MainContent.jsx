import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";

const PostHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="font-semibold">Baro_211</div>
          <span>•</span>
          <div className="text-sm text-gray-500">2 giờ trước</div>
        </div>
        <div>
          <MoreHorizontal size={20} />
        </div>
      </div>
    </>
  );
};

const PostContent = () => {
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-md h-128 ">
      <p className="text-gray-300 overflow-hidden h-full items-center flex justify-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
        sapien eget nunc gravida tincidunt. Sed ut perspiciatis unde omnis iste
        natus error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
        beatae vitae dicta sunt explicabo.
      </p>
    </div>
  );
};

const PostInteraction = () => {
  const iconHover =
    " cursor-pointer hover:scale-109 transition-all duration-200";
  return (
    <>
      <div className="flex items-center mt-2">
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Heart
              size={25}
              fill="currentColor"
              className={`${iconHover} text-red-500 `}
            />
            <span className="text-sm font-semibold">36k</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={25} className={iconHover} />
            <span className="text-sm font-semibold">36k</span>
          </div>
          <div className="flex items-center gap-2">
            <Send size={24} className={iconHover} />
            <span className="text-sm font-semibold">36k</span>
          </div>
        </div>
        <Bookmark size={25} className={`${iconHover} ml-auto`} />
      </div>
    </>
  );
};

const MainContent = () => {
  return (
    <div className="flex-1 p-4 ">
      <PostHeader />
      <PostContent />
      <PostInteraction />
    </div>
  );
};
export default MainContent;
