
import { notificationService } from "@/services/notificationService";
import { useEffect, useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [data, unread, read] = await Promise.all([
          notificationService.getAllNotifications(),
          notificationService.notificationUnRead()
        ]);
        setNotifications(data);
        setUnread(unread);
      } catch (err) {
        setError(err);
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
  return { notifications, unread };
};
export default useNotifications;
