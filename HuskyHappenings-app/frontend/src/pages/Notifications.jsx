import { useEffect, useState } from "react";
import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const response = await fetch("https://localhost:5000/api/notifications", {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setNotifications(data);
      } else {
        console.error(data.error || "Failed to load notifications");
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `https://localhost:5000/api/notifications/${notificationId}/read`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        loadNotifications();
      } else {
        console.error(data.error || "Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        "https://localhost:5000/api/notifications/read-all",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        loadNotifications();
      } else {
        console.error(data.error || "Failed to mark all notifications as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button className="mark-all-btn" onClick={markAllAsRead}>
          Mark All as Read
        </button>
      </div>

      {loading ? (
        <p className="notifications-message">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="notifications-message">No notifications yet.</p>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.NotificationID}
              className={`notification-card ${
                notification.IsRead ? "read" : "unread"
              }`}
            >
              <div className="notification-top">
                <p className="notification-message">{notification.Message}</p>
                {!notification.IsRead && (
                  <button
                    className="read-btn"
                    onClick={() => markAsRead(notification.NotificationID)}
                  >
                    Mark Read
                  </button>
                )}
              </div>

              <div className="notification-bottom">
                <span className="notification-type">
                  Type: {notification.Type}
                </span>
                <span className="notification-time">
                  {notification.CreatedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}