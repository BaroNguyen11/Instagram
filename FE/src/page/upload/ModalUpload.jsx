import { createPortal } from "react-dom";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import { postService } from "../../services/postService";

const ModalUpload = ({ onClose, refetchPosts }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const { profile } = useProfile();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const url = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(url);
    setStep(2);
  };

  const handleBackToSelect = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
    setCaption("");
    setStep(1);
  };

  const handleCreatePost = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("images", file);

      await postService.createPost(formData);
      if (refetchPosts) {
        await refetchPosts();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const modalSize =
    step === 3
      ? "max-w-[800px] h-[560px]"
      : "max-w-[550px] h-[650px]";

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 cursor-pointer"
      >
        <X size={32} />
      </button>

      {/* Modal */}
      <div
        className={`relative w-full ${modalSize} bg-[#080808] rounded-3xl overflow-hidden z-10 flex flex-col transition-all duration-300`}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="h-12 border-b border-[#363636] flex items-center justify-center text-white font-semibold">
              Create new post
            </div>

            <div className="flex-1 bg-[#222328] flex flex-col items-center justify-center text-white p-6">
              <svg
                aria-label="Icon to represent media such as images or videos"
                fill="currentColor"
                height="77"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <path d="M16.3 0A16.3 16.3 0 000 16.3V61a16.3 16.3 0 0016.3 16.3h65a16.3 16.3 0 0016.3-16.3V16.3A16.3 16.3 0 0081.3 0zm0 3h65a13.3 13.3 0 0113.3 13.3V61a13.3 13.3 0 01-13.3 13.3h-65A13.3 13.3 0 013 61V16.3A13.3 13.3 0 0116.3 3zm9.8 16.8a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm45.3 12.8L48.2 55.8l-12-12L13.3 66.7h70.9z" />
              </svg>

              <p className="text-[22px] mt-6 mb-6 font-medium text-center">
                Drag photos and videos here
              </p>

              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
              />

              <label
                htmlFor="fileInput"
                className="bg-[#0095f6] hover:bg-[#1877f2] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
              >
                Select from computer
              </label>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="h-12 border-b border-[#363636] flex items-center justify-between px-4 text-white font-semibold">
              <button
                onClick={handleBackToSelect}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </button>

              <span>Crop</span>

              <button
                onClick={() => setStep(3)}
                className="cursor-pointer text-[#0095f6]"
              >
                Next
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center">
              {file?.type.startsWith("video/") ? (
                <video
                  src={preview}
                  controls
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="h-12 border-b border-[#363636] flex items-center justify-between px-4 text-white font-semibold">
              <button
                onClick={() => setStep(2)}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </button>

              <span>Create new post</span>

              <button
                onClick={handleCreatePost}
                className="cursor-pointer text-[#0095f6]"
              >
                Create
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left */}
              <div className="flex-1 bg-black flex items-center justify-center">
                {file?.type.startsWith("video/") ? (
                  <video
                    src={preview}
                    controls
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              {/* Right */}
              <div className="w-85 border-l border-[#363636] flex flex-col">
                <div className="flex items-center gap-3 p-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBo6bythwEPQHLVrQUDTLl-bVfJ4MnxRDWQ&s"
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div className="flex flex-col text-white">
                    <span className="font-semibold text-sm">
                      {profile?.User?.username}
                    </span>

                    <span className="text-xs text-gray-400">
                      {profile?.User?.fullname}
                    </span>
                  </div>
                </div>

                <textarea
                  value={caption}
                  onChange={(e) =>
                    setCaption(e.target.value)
                  }
                  placeholder="Write a caption..."
                  maxLength={2200}
                  className="flex-1 px-4 py-2 bg-transparent text-white resize-none outline-none placeholder:text-gray-500"
                />

                <div className="px-4 py-3 text-xs text-gray-500 text-right">
                  {caption.length}/2200
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalUpload;