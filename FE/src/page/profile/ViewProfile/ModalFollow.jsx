import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const ModalFollow = ({
  isOpen,
  onClose,
  title,
  displayUser,
  searchKeyword,
  setSearchKeyword,
  isFollowed
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const handleClose = () => {
    setSearchKeyword("");
    onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-80 "
      onClick={handleClose}
    >
      <div
        className="w-150 max-h-137.5 bg-[#262626] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b py-3">
          <h2 className="text-center font-semibold text-lg">{title}</h2>

          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-120 overflow-y-auto ">
          <div className="relative flex items-center justify-center px-4 py-2">
            <Search
              size={18}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search"
              className="block w-full text-sm p-2  px-9 rounded-sm bg-[rgba(255,255,255,0.1)] text-white focus:outline-none focus:bg-[rgba(255,255,255,0.05)] transition-all duration-100"
            />
          </div>
          {displayUser.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No {title.toLowerCase()} yet.
            </p>
          ) : (
            displayUser.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between px-4 py-3 ]"
              >
                <Link
                  to={`/users/${user._id}`}
                  className="flex items-center gap-3"
                  onClick={onClose}
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.username}
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.fullName}</p>
                  </div>
                </Link>

                <button className="border rounded-md px-4 py-1 text-sm bg-[#262626] hover:bg-[rgba(256,256,256,0.1)] cursor-pointer">
                 {isFollowed === "Following" ? "Following" : "Remove"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalFollow;
