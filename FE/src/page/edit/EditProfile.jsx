import { Search } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfile } from "../../services/profileService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const { profile } = useProfile();
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile?.User) return;

    setWebsite(profile.User.website || "");
    setBio(profile.User.bio || "");
    setFullName(profile.User.fullName || "");
    setGender(profile.User.gender || "");

    setBirthDate(
      profile.User.birthDate ? profile.User.birthDate.slice(0, 10) : "",
    );
  }, [profile]);

  const isValidWebsite = (value) => {
    if (!value) return true;

    try {
      const url = new URL(
        value.startsWith("http") ? value : `https://${value}`,
      );

      return url.hostname.includes(".");
    } catch {
      return false;
    }
  };
  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setWebsite(value);

    if (!isValidWebsite(value)) {
      setWebsiteError("Please enter a valid website.");
    } else {
      setWebsiteError("");
    }
  };
  const handleSubmit = async () => {
    if (websiteError) return;

    try {
      const data = {
        bio,
        website,
        fullName,
        birthDate,
        gender,
      };
      await updateProfile(data);

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate(`/profile`);
      }, 1000);
    } catch (error) {
      toast.error(
        "An error occurred while updating the profile. Please try again.",
      );
    }
  };
  return (
    <>
      <div className="max-w-180 mx-auto py-10">
        <h2 className="font-bold text-2xl pb-10">Edit profile</h2>
        <div className="rounded-lg bg-[rgba(256,256,256,0.15)] h-25 flex items-center justify-around px-6 ">
          <div className="flex items-center justify-between gap-4 h-full w-full">
            <div className="flex items-center gap-4 ">
              <img
                src={profile?.User?.avatar}
                alt=""
                className="w-15 h-15 rounded-full"
              />
              <div className="flex flex-col">
                <div className="font-bold text-sm">
                  {profile?.User?.username}
                </div>
                <div className="text-sm text-gray-400 ">
                  {profile?.User?.fullName}
                </div>
              </div>
            </div>
            <button className="bg-blue-600 text-xs font-bold cursor-pointer px-5 py-2.5 rounded-md hover:bg-blue-700 transition-all duration-200">
              Change photo
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-bold text-lg">Website</h3>
          <input
            type="text"
            value={website}
            onChange={handleWebsiteChange}
            placeholder="https://example.com"
            className={`border transition-all duration-150 block w-full px-3 py-2 rounded-sm mt-2 text-sm ${
              websiteError
                ? "border-red-500"
                : "border-gray-600 focus:border-gray-400"
            }`}
          />
          {websiteError && (
            <p className="mt-1 text-xs text-red-500">{websiteError}</p>
          )}
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg">Bio</h3>
          <textarea
            name="bio"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
            className="resize-none text-sm placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:border-gray-400 transition-all duration-150 block w-full p-3 rounded-lg mt-2 h-20 text-white"
            placeholder="No bio available"
          />

          <div
            className={`mt-1 text-right text-xs ${
              bio.length >= 150 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {bio.length}/150
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="mt-10 w-[50%]">
            <h3 className="font-bold text-lg">Full Name</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-600 focus:outline-none focus:border-gray-400 transition-all duration-150 block w-full px-3 py-2 rounded-sm mt-2  text-white text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mt-10 w-[50%]">
            <h3 className="font-bold text-lg">Birth day</h3>
            <input
              type="date"
              placeholder="Birth day"
              className="border border-gray-600 focus:outline-none focus:border-gray-400 transition-all duration-150 block w-full px-3 py-2 rounded-sm mt-2  text-white text-sm"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg">Gender</h3>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="mt-2 h-12 w-full border-gray-700 bg-[rgba(255,255,255,.08)]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>

            <SelectContent position="popper">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          className="bg-blue-600 w-full text-xs font-bold cursor-pointer mt-10 px-5 py-2.5 rounded-md hover:bg-blue-700 transition-all duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default EditProfile;
