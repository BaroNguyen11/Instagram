import { notificationService } from "@/services/notificationService";
import { useEffect, useState } from "react";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsUnread, setNotificationsUnread] = useState({
    count: 0,
    notifications: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [data, unread] = await Promise.all([
          notificationService.getAllNotifications(),
          notificationService.notificationUnRead(),
        ]);

        setNotifications(data);
        setNotificationsUnread(unread);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
  return { notifications, notificationsUnread };
};
export default useNotifications;
