import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const Story = () => {
  const imageStyle =
    " rounded-full object-cover bg-black cursor-pointer block transition-all duration-200 w-full h-full border-4 border-black";
  const storyStyle =
    " p-1 rounded-full w-24 h-24 shrink-0 flex items-center justify-center ";
  const nameStyle = "text-xs mt-1 text-gray-400 truncate w-20 text-center ";
  const style = "flex flex-col items-center min-w-[6rem]";
  const data = [
    {
      id: 1,
      name: "Balerina capuchina",
      img: "https://i.pinimg.com/736x/56/6a/77/566a77c30c79d018be3685ca2cd8e009.jpg",
      active: true,
    },
    {
      id: 2,
      name: "Tung Tung Tung Sahur",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s",
      active: false,
    },
    {
      id: 3,
      name: "Tralaleo Tralala",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRk1xakS1EowmDCEzGFvz1C4NSZ9_jW7cgvw&s",
      active: false,
    },
    {
      id: 4,
      name: "Capuchino Assasino",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hFF2eR6LGofRJjv74RcEh5kB6bi2kW4Vlw&s",
      active: false,
    },
    {
      id: 5,
      name: "Br Br Patapim",
      img: "https://cdn.myshoptet.com/usr/www.paintingfromphoto.com/user/shop/detail/54073_painting_by_numbers_brr_brr_patapim_m2.jpg?68b7d454",
      active: false,
    },
  ];
  const scrollRef = useRef();
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
        <div
          onClick={prev}
          className="absolute left-1.5 top-2/5 -translate-y-2/5 bg-white rounded-full p-1 cursor-pointer z-10"
        >
          <ChevronLeft size={20} color="gray" />
        </div>
        <div className="flex space-x-7 overflow-x-auto w-full scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={scrollRef}>
          {data.map((item) => (
            <div className={style} key={item.id}>
              <div className={` ${storyStyle} ${item.active ? "bg-linear-[45deg] from-[#f6ff00] via-[#f15130] to-[#ca09bf]" : "bg-[#3a3a3a]"}`}>
                <img src={item.img} alt="" className={imageStyle} />
              </div>
              <span className={nameStyle}>{item.name}</span>
            </div>
          ))}
        </div>
        <div
          onClick={next}
          className="absolute right-1.5 top-2/5 -translate-y-2/5 bg-white rounded-full p-1 cursor-pointer z-10"
        >
          <ChevronRight size={20} color="gray" />
        </div>
      </div>
    </>
  );
};
export default Story;