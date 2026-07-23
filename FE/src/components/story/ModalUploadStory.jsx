import { createPortal } from "react-dom";
import { X, ImagePlus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { storyService } from "@/services/storyService";
import toast from "react-hot-toast";

const ModalUploadStory = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      if (selected.type.startsWith("image/") || selected.type.startsWith("video/")) {
        setFile(selected);
        setPreviewImage(URL.createObjectURL(selected));
      } else {
        toast.error("Please select an image or video file.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type.startsWith("image/") || selected.type.startsWith("video/")) {
      setFile(selected);
      setPreviewImage(URL.createObjectURL(selected));
    } else {
      toast.error("Please select an image or video file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("files", file);

      await storyService.createStory(formData);
      toast.success("Story shared successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to share story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    if (previewImage) URL.revokeObjectURL(previewImage);
    setFile(null);
    setPreviewImage(null);
  };

  const handleClose = () => {
    if (previewImage) URL.revokeObjectURL(previewImage);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#080808]/85 transition-opacity duration-200 animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-[440px] h-[620px] bg-[#1c1c1e] border border-white/[0.08] rounded-2xl overflow-hidden z-[410] flex flex-col shadow-2xl transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-14 border-b border-white/[0.08] flex items-center justify-between px-4 shrink-0 relative">
          {previewImage ? (
            <button
              onClick={handleDiscard}
              className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-white/5"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-8" />
          )}

          <h2 className="font-semibold text-white text-base absolute left-1/2 -translate-x-1/2 select-none">
            Create Story
          </h2>

          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-full hover:bg-white/5"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {!previewImage ? (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`flex-1 flex flex-col justify-center items-center p-6 text-center transition-colors duration-200 ${
              isDragActive ? "bg-white/[0.04]" : "bg-[#121212]"
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-white/[0.04] flex items-center justify-center mb-6 border border-white/[0.05]">
              <ImagePlus size={44} className="text-white/80" />
            </div>

            <p className="text-[20px] font-medium text-white mb-2 select-none leading-snug">
              Drag photos and videos here
            </p>
            <p className="text-sm text-gray-400 mb-6 max-w-[280px] leading-relaxed">
              Share a photo or video that will disappear after 24 hours.
            </p>

            <label className="bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#1877f2]/90 text-white transition-colors duration-200 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer select-none shadow-md">
              Select from computer
              <input
                hidden
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[#121212] overflow-hidden">
            {/* Story Preview Area */}
            <div className="flex-1 flex items-center justify-center p-6 min-h-0">
              <div className="h-full aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/[0.06] relative flex items-center justify-center max-h-[420px]">
                {file.type.startsWith("image") ? (
                  <img
                    src={previewImage}
                    className="w-full h-full object-cover select-none"
                    alt="story preview"
                  />
                ) : (
                  <video
                    src={previewImage}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="h-20 border-t border-white/[0.08] flex items-center justify-between px-6 shrink-0 bg-[#1c1c1e]">
              <button
                onClick={handleDiscard}
                className="px-5 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] active:bg-white/[0.08] text-white transition-colors duration-200 text-sm font-semibold cursor-pointer select-none"
              >
                Discard
              </button>

              <button
                disabled={loading}
                onClick={handleUpload}
                className="px-6 py-2.5 rounded-lg bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#1877f2]/90 disabled:opacity-50 text-white transition-colors duration-200 text-sm font-semibold cursor-pointer select-none shadow-md flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Share Story</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default ModalUploadStory;
