import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { storyService } from "@/services/storyService";
import StoryProgress from "./StoryProgress";
import StoryHeader from "./StoryHeader";
import StoryFooter from "./StoryFooter";

const ModalStory = ({ storiesGroupList, initialGroupIndex = 0, onClose, refetch }) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(initialGroupIndex);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [storyDuration, setStoryDuration] = useState(15000); // default 15s
  
  const videoRef = useRef(null);
  const seenStoryIds = useRef(new Set());

  const currentGroup = storiesGroupList[activeGroupIndex];
  const currentStories = currentGroup?.stories || [];
  const currentStory = currentStories[activeStoryIndex];

  // Reset story index when group changes
  useEffect(() => {
    setActiveStoryIndex(0);
    setProgress(0);
  }, [activeGroupIndex]);

  // Reset progress and set duration based on current story (fallback to 5s)
  useEffect(() => {
    setProgress(0);
    if (currentStory) {
      const defaultDuration = (currentStory.duration || 5) * 1000;
      setStoryDuration(defaultDuration);
    }
  }, [activeStoryIndex, currentStory]);

  // Preload next story media (image/video) to ensure instant rendering
  useEffect(() => {
    let nextStory = null;
    if (activeStoryIndex < currentStories.length - 1) {
      nextStory = currentStories[activeStoryIndex + 1];
    } else if (activeGroupIndex < storiesGroupList.length - 1) {
      nextStory = storiesGroupList[activeGroupIndex + 1]?.stories?.[0];
    }

    if (nextStory?.media?.url) {
      const url = nextStory.media.url;
      const type = nextStory.media.type || "";
      const isNextVideo = type === "video" || 
                          url.toLowerCase().endsWith(".mp4") || 
                          url.toLowerCase().includes("video");

      if (isNextVideo) {
        const video = document.createElement("video");
        video.src = url;
        video.preload = "auto";
      } else {
        const img = new Image();
        img.src = url;
      }
    }
  }, [activeStoryIndex, activeGroupIndex, currentStories, storiesGroupList]);

  // Handle auto-advancing progress
  useEffect(() => {
    if (isPaused || !currentStory) return;

    const intervalTime = 50; // update every 50ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + (intervalTime / storyDuration) * 100;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryIndex, activeGroupIndex, isPaused, storyDuration, currentStory]);

  // Handle slide transition when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      handleNextStory();
    }
  }, [progress]);

  // Mark story as seen on backend without triggering intermediate refetches
  useEffect(() => {
    if (!currentStory) return;

    const storyId = currentStory._id;
    if (seenStoryIds.current.has(storyId)) return;

    seenStoryIds.current.add(storyId);
    
    // Call API patch views
    storyService.seenStory(storyId)
      .catch((err) => console.error("Error marking story as seen:", err));
  }, [activeStoryIndex, activeGroupIndex, currentStory]);

  const refetchRef = useRef(refetch);
  useEffect(() => {
    refetchRef.current = refetch;
  }, [refetch]);

  // Refetch stories once when the modal is closed to update home page rings
  useEffect(() => {
    return () => {
      if (refetchRef.current) {
        refetchRef.current();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNextStory();
      } else if (e.key === "ArrowLeft") {
        handlePrevStory();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStoryIndex, activeGroupIndex, currentStories, storiesGroupList]);

  if (!currentGroup || !currentStory) return null;

  const handleNextStory = () => {
    if (activeStoryIndex < currentStories.length - 1) {
      setActiveStoryIndex((prev) => prev + 1);
    } else {
      // Go to next user's story
      if (activeGroupIndex < storiesGroupList.length - 1) {
        setActiveGroupIndex((prev) => prev + 1);
      } else {
        // Last story of last user -> close modal
        onClose();
      }
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
    } else {
      // Go to previous user's story (load their last story)
      if (activeGroupIndex > 0) {
        const prevGroupIdx = activeGroupIndex - 1;
        const prevGroupStories = storiesGroupList[prevGroupIdx]?.stories || [];
        setActiveGroupIndex(prevGroupIdx);
        // Delay setting story index until the new group list loads
        setTimeout(() => {
          setActiveStoryIndex(Math.max(0, prevGroupStories.length - 1));
        }, 0);
      }
    }
  };

  const handleVideoLoadedMetadata = (e) => {
    if (e.target.duration) {
      setStoryDuration(e.target.duration * 1000);
    }
  };

  const mediaUrl = currentStory.media?.url || "";
  const mediaType = currentStory.media?.type || "";

  const isVideo = mediaType === "video" || 
                  mediaUrl.toLowerCase().endsWith(".mp4") || 
                  mediaUrl.toLowerCase().includes("video");

  return createPortal(
    <div className="fixed inset-0 bg-[#0c0c0d]/95 z-500 flex py-10 items-center justify-center select-none overflow-hidden animate-fade-in">
      {/* Background close area */}
      <div className="absolute inset-0 z-10" onClick={onClose} />

      {/* Large desktop chevrons */}
      {activeGroupIndex > 0 && (
        <button
          onClick={() => setActiveGroupIndex((prev) => prev - 1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 active:bg-white/15 text-white rounded-full transition-colors duration-200 cursor-pointer z-30"
          aria-label="Previous User"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {activeGroupIndex < storiesGroupList.length - 1 && (
        <button
          onClick={() => setActiveGroupIndex((prev) => prev + 1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/20 active:bg-white/15 text-white rounded-full transition-colors duration-200 cursor-pointer z-30"
          aria-label="Next User"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Close button at the very top right (Desktop only) */}
      <button
        onClick={onClose}
        className="hidden md:flex absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-2 rounded-full hover:bg-white/5 z-30"
        aria-label="Close stories"
      >
        <X size={28} />
      </button>

      {/* Story Viewport */}
      <div 
        className="relative w-full max-w-105 max-h-full aspect-9/16 bg-black md:rounded-xl overflow-hidden shadow-2xl border border-white/5 z-20 flex flex-col items-center justify-center"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <StoryProgress 
          stories={currentStories} 
          activeStoryIndex={activeStoryIndex} 
          progress={progress} 
        />

        {/* Story Header */}
        <StoryHeader 
          user={currentGroup.user} 
          createdAt={currentStory.createdAt} 
          onClose={onClose} 
        />

        {/* Media content */}
        <div className="w-full h-full relative flex items-center justify-center min-h-0 bg-zinc-950">
          {/* Left Navigation Hotspot (30% width) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevStory();
            }}
            className="absolute left-0 top-0 bottom-0 w-[30%] z-20 cursor-pointer"
          />

          {/* Right Navigation Hotspot (70% width) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
            className="absolute right-0 top-0 bottom-0 w-[70%] z-20 cursor-pointer"
          />

          {isVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              autoPlay
              playsInline
              onLoadedMetadata={handleVideoLoadedMetadata}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Story Content"
              className="w-full h-full object-cover"
              draggable="false"
            />
          )}
        </div>

        {/* Optional caption overlay */}
        {currentStory.content && (
          <div className="absolute bottom-20 left-0 right-0 px-6 text-center z-30 bg-gradient-to-t from-black/40 via-black/10 to-transparent py-3">
            <p className="text-white text-sm drop-shadow-md leading-relaxed select-text font-normal">
              {currentStory.content}
            </p>
          </div>
        )}

        {/* Story Footer Reaction Bar */}
        <StoryFooter 
          username={currentGroup.user?.username}
          onSendMessage={(msg) => console.log("Story reply message:", msg)}
          onLikeStory={(liked) => console.log("Story like status:", liked)}
        />
      </div>
    </div>,
    document.body
  );
};

export default ModalStory;
