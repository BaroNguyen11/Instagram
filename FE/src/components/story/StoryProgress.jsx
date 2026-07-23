import React from "react";

const StoryProgress = ({ stories = [], activeStoryIndex = 0, progress = 0 }) => {
  return (
    <div className="absolute top-3 left-0 right-0 px-2.5 flex gap-1 z-30">
      {stories.map((item, idx) => {
        let widthPercent = 0;
        if (idx < activeStoryIndex) widthPercent = 100;
        else if (idx === activeStoryIndex) widthPercent = progress;

        return (
          <div
            key={item._id || idx}
            className="h-[3px] flex-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              style={{ width: `${widthPercent}%` }}
              className="h-full bg-white transition-[width] duration-75 ease-linear"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StoryProgress;
