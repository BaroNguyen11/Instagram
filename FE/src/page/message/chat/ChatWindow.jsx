import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatWindow  = ({user,currentUser}) => {
    //   console.log(user)
  return (
   <>
    <ChatHeader user={user}/>
    <ChatMessages user={user} currentUser={currentUser}/>
    <ChatInput user={user} currentUser={currentUser}/>
   </>
  );
};

export default ChatWindow ;
