import { Bookmark, ContactRound, Logs } from "lucide-react";
import { NavLink } from "react-router-dom";

const Menu = ({ isOwnProfile, userId }) => {
  const baseRoute = isOwnProfile ? "/profile" : `/users/${userId}`;

  return (
    <div className="flex justify-around mt-5 border-b border-[#333] ">
      <NavLink
        to={baseRoute}
        end
        className={({ isActive }) =>
          `cursor-pointer flex justify-center items-center w-20 ${
            isActive ? "border-b-2 pb-2 border-white" : ""
          }`
        }
      >
        <Logs />
      </NavLink>

      {isOwnProfile && (
        <NavLink
          to={`${baseRoute}/saved`}
          className={({ isActive }) =>
            `cursor-pointer w-20 flex justify-center items-center ${
              isActive ? "border-b-2 pb-2 border-white" : ""
            }`
          }
        >
          <Bookmark />
        </NavLink>
      )}

      <NavLink
        to={`${baseRoute}/tagged`}
        className={({ isActive }) =>
          `cursor-pointer w-20 flex justify-center items-center ${
            isActive ? "border-b-2 pb-2 border-white" : ""
          }`
        }
      >
        <ContactRound />
      </NavLink>
    </div>
  );
};

export default Menu;
