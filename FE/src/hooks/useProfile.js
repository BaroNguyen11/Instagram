import { useEffect, useState } from "react";
import { profileService } from "@/services/profileService";
import { useParams } from "react-router-dom";
import { userService } from "@/services/userService";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      let loggedInUserId = null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        loggedInUserId = payload._id;
      } catch (e) {
        console.error("Token decode error:", e);
      }

      const own = !id || id === loggedInUserId;
      setIsOwnProfile(own);

      try {
        let data;

        if (id) {
          // profile người khác
          const responseData = await userService.getUserProfile(id);
          data = {
            User: responseData,
            isFollowing: responseData.isFollowing,
          };
        } else {
          // profile của mình
          data = await profileService.getProfile();
        }

        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  return { profile, setProfile, loading, isOwnProfile };
};

export default useProfile;