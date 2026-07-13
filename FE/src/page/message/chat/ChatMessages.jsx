import { messageServices } from "@/services/messageService";
import { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { socket } from "@/socket/socket";

const ChatMessages = ({ user, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?._id) return;
      const data = await messageServices.getMessages(user._id);
      setMessages(data);
      await messageServices.readMessages(user._id);
    };
    fetchMessages();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!currentUser?._id) return;

    const handleMessagesRead = ({ by }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender._id === currentUser._id && msg.receiver._id === by
            ? { ...msg, isRead: true }
            : msg,
        ),
      );
    };

    socket.on("messagesRead", handleMessagesRead);
    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [currentUser]);

  useEffect(() => {
    if (!user?._id || !currentUser?._id) return;

    const handleNewMessage = (message) => {
      const isCurrentChat =
        (message.sender._id === user._id &&
          message.receiver._id === currentUser._id) ||
        (message.sender._id === currentUser._id &&
          message.receiver._id === user._id);

      if (isCurrentChat) {
        setMessages((prev) => [...prev, message]);
        // Automatically mark the message as read if it is received in the active chat
        if (message.sender._id === user._id) {
          messageServices.readMessages(user._id);
        }
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [user, currentUser]);

  return (
    <div className="flex-1 overflow-y-auto p-4 custom-scroll">
      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <MessageBubble
            key={message._id}
            message={message}
            currentUser={currentUser}
            isLast={index === messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
