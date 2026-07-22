import useStory from "@/hooks/useStory";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModalUploadStory from "./ModalUploadStory";

const Story = () => {
  const { story } = useStory();
  const [openStory, setOpenStory] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  console.log(story);
  const imageStyle =
    " rounded-full object-cover bg-black cursor-pointer block transition-all duration-200 w-full h-full border-4 border-black";
  const storyStyle =
    " p-1 rounded-full w-24 h-24 shrink-0 flex items-center justify-center ";
  const nameStyle = "text-xs mt-1 text-gray-400 truncate w-20 text-center ";
  const style = "flex flex-col items-center min-w-[6rem]";

  const scrollRef = useRef();
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);

    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };
  useEffect(() => {
    checkScroll();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);
  const next = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  const prev = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="relative w-full">
        {canScrollLeft && (
          <div
            onClick={prev}
            className="absolute left-1.5 top-2/5 -translate-y-2/5 bg-white rounded-full p-1 cursor-pointer z-10"
          >
            <ChevronLeft size={20} color="gray" />
          </div>
        )}
        <div
          className="flex space-x-7 overflow-x-auto w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={scrollRef}
        >
          <div className="flex flex-col items-center min-w-24">
            <div
              onClick={() => setOpenStory(true)}
              className="p-1 rounded-full w-24 h-24 shrink-0 flex items-center justify-center bg-[#3a3a3a] cursor-pointer hover:scale-101 transition"
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center">
                  <Plus
                    className="w-14 h-14 text-[#767676]"
                    strokeWidth={1.3}
                  />
                </div>
              </div>
            </div>

            <span className="text-xs mt-1 text-gray-400 truncate w-20 text-center">
              Your story
            </span>
          </div>
          {story.map((item) => (
            <div className={style} key={item.id}>
              <div
                className={` ${storyStyle} ${item.active ? "bg-linear-[45deg] from-[#f6ff00] via-[#f15130] to-[#ca09bf]" : "bg-[#3a3a3a]"}`}
              >
                <img src={item?.stories[0]?.user?.avatar} alt="" className={imageStyle} />
              </div>
              <span className={nameStyle}>{item?.user?.username}</span>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <div
            onClick={next}
            className="absolute right-1.5 top-2/5 -translate-y-2/5 bg-white rounded-full p-1 cursor-pointer z-10"
          >
            <ChevronRight size={20} color="gray" />
          </div>
        )}
      </div>
      {openStory && <ModalUploadStory onClose={() => setOpenStory(false)} />}
    </>
  );
};
export default Story;
