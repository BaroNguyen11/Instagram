import { notificationService } from "@/services/notificationService";
import { storyService } from "@/services/storyService";
import { useEffect, useState, useCallback } from "react";

const useStory = () => {
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStory = useCallback(async () => {
    try {
      const data = await storyService.getStory();
      setStory(data);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return { story, refetch: fetchStory, loading, error };
};
export default useStory;
