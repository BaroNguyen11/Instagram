import ConversationList from "./ConversationList";
import { useState, useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import EmptyChat from "./EmptyChat";
import ChatWindow from "./chat/ChatWindow";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/socket/socket";

const Message = () => {
  const { users, setUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const { currentUser } = useAuth();

  // Mark messages as read locally when a conversation is selected
  useEffect(() => {
    if (!selectedUser?._id) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u._id !== selectedUser._id) return u;
        return {
          ...u,
          lastMessage: u.lastMessage
            ? {
                ...u.lastMessage,
                isRead: true,
              }
            : null,
        };
      }),
    );
  }, [selectedUser, setUsers]);

  useEffect(() => {
    if (!currentUser?._id) return;

    const handleNewMessage = (message) => {
      setUsers((prevUsers) => {
        const otherUserId =
          message.sender._id === currentUser._id
            ? message.receiver._id
            : message.sender._id;

        const isRead =
          message.sender._id === currentUser._id ||
          (selectedUser && otherUserId === selectedUser._id);

        const updated = prevUsers.map((u) => {
          if (u._id === otherUserId) {
            return {
              ...u,
              lastMessage: {
                ...message,
                isRead,
              },
            };
          }
          return u;
        });

        // Re-sort so active conversation moves to the top
        return [...updated].sort((a, b) => {
          const timeA = a.lastMessage
            ? new Date(a.lastMessage.createdAt).getTime()
            : 0;
          const timeB = b.lastMessage
            ? new Date(b.lastMessage.createdAt).getTime()
            : 0;
          return timeB - timeA;
        });
      });
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [currentUser, setUsers, selectedUser]);
  useEffect(() => {
    if (!currentUser?._id) return;

    const handleMessagesRead = ({ by }) => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u._id !== by) return u;

          return {
            ...u,
            lastMessage: {
              ...u.lastMessage,
              isRead: true,
            },
          };
        }),
      );
    };

    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [currentUser]);
  return (
    <div className="flex-1 flex h-screen">
      <ConversationList
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        currentUser={currentUser}
      />
      <div className="w-[75%] flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow user={selectedUser} currentUser={currentUser} />
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
};

export default Message;
