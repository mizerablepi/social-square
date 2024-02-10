import getUser from "@/helper/getUser";
import Aside from "@/components/home/Aside";
import Body from "@/components/home/Body";
import Extra from "@/components/home/Extra";
import MobileHeader from "@/components/MobileHeader";
import MobileNavbar from "@/components/MobileNavbar";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex gap-6">
      <Aside profilePic={user.profilePicture} />
      <div className="flex-grow-[2] flex flex-col min-h-screen">
        <MobileHeader profilePic={user.profilePicture} />
        <Body />
        <MobileNavbar />
      </div>
      <Extra />
    </div>
  );
}
