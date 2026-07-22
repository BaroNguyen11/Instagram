import { createPortal } from "react-dom";
import { X, ImagePlus } from "lucide-react";
import { useState } from "react";
import { storyService } from "@/services/storyService";


const ModalUploadStory = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("files", file);

      await storyService.createStory(formData);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-9999">
      <div className="bg-[#1c1c1c] w-137.5 rounded-2xl overflow-hidden">

        <div className="relative border-b border-white/10 p-4">
          <h2 className="text-center font-semibold">
            Create Story
          </h2>

          <button
            onClick={onClose}
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            <X />
          </button>
        </div>

        <div className="h-[420px] flex flex-col items-center justify-center gap-4">

          <ImagePlus size={80} />

          <p>
            {file ? file.name : "Select a photo or video"}
          </p>

          <label className="bg-blue-500 px-5 py-2 rounded-lg cursor-pointer">
            Choose from computer

            <input
              hidden
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-green-500 px-5 py-2 rounded-lg"
            >
              {loading ? "Uploading..." : "Upload Story"}
            </button>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalUploadStory;