import { notificationService } from "@/services/notificationService";
import { storyService } from "@/services/storyService";
import { useEffect, useState } from "react";

const useStory = () => {
  const [story, setStory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await storyService.getStory();
        setStory(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []);
  return { story };
};
export default useStory;
