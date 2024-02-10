import getUser from "@/helper/getUser";
import Extra from "@/components/home/Extra";
import MobileHeader from "@/components/MobileHeader";
import MobileNavbar from "@/components/MobileNavbar";
import ChatBody from "@/components/chat/Body";
import ChatAside from "@/components/chat/Aside";

async function Chat() {
  const user = await getUser();
  return (
    <div className="flex gap-6">
      <ChatAside profilePic={user.profilePicture} />
      <div className="flex-grow-[2] flex flex-col min-h-screen">
        <MobileHeader profilePic={user.profilePicture} />
        <ChatBody />
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Chat;
