import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const PushNotifications = () => {
  return (
    <>
      <div className="max-w-150 mx-auto py-10">
        <div className="flex items-center pb-10 gap-2">
          <ChevronLeft />
          <h2 className="font-bold text-2xl ">Push Notifications</h2>
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Push Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pause all</span>
            <Switch />
          </div>
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Likes</h3>
          <RadioGroup defaultValue="From everyone" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From profiles I follow" id="r2" />
              <Label htmlFor="r2">From profiles I follow</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From everyone" id="r3" />
              <Label htmlFor="r3">From everyone</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="pb-10">
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed liked your photo.
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Like milestones</h3>
          <RadioGroup defaultValue="On" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="On" id="r2" />
              <Label htmlFor="r2">On</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            Your post has 100 likes.
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Comments</h3>
          <RadioGroup defaultValue="From everyone" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From profiles I follow" id="r2" />
              <Label htmlFor="r2">From profiles I follow</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From everyone" id="r3" />
              <Label htmlFor="r3">From everyone</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="pb-10">
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed commented: "Nice shot!"
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Comment likes</h3>
          <RadioGroup defaultValue="On" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="On" id="r2" />
              <Label htmlFor="r2">On</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed liked your comment: Nice shot!
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Sticker responses</h3>
          <RadioGroup defaultValue="On" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="On" id="r2" />
              <Label htmlFor="r2">On</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            You have new responses to your poll sticker.
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Comment daily digest</h3>
          <RadioGroup defaultValue="From everyone" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From profiles I follow" id="r2" />
              <Label htmlFor="r2">From profiles I follow</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From everyone" id="r3" />
              <Label htmlFor="r3">From everyone</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="pb-10">
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed recently commented on this post: Nice shot!
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Posts suggested for you</h3>
          <RadioGroup defaultValue="On" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="On" id="r2" />
              <Label htmlFor="r2">On</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed shared a post you might like.
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">First posts and stories</h3>
          <RadioGroup defaultValue="From everyone" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From profiles I follow" id="r2" />
              <Label htmlFor="r2">From profiles I follow</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="From everyone" id="r3" />
              <Label htmlFor="r3">From everyone</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="pb-10">
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            See johnappleseed's first story on Instagram, and other similar
            notifications.
          </h3>
          <hr />
        </div>

        <div className="pb-10">
          <h3 className="text-md font-bold pb-5">Notes</h3>
          <RadioGroup defaultValue="On" className="w-fit">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Off" id="r1" />
              <Label htmlFor="r1">Off</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="On" id="r2" />
              <Label htmlFor="r2">On</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="text-xs font-light pb-2 text-[#898787]">
            johnappleseed, janeappleseed and 3 others shared notes.
          </h3>
          <hr />
        </div>
      </div>
    </>
  );
};
export default PushNotifications;
