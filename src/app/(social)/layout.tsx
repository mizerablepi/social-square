import Aside from "@/components/home/Aside";
import Body from "@/components/home/Body";
import Extra from "@/components/home/Extra";
import getUser from "@/helper/getUser";

async function SocialLayout({ children }: any) {
  const user = await getUser();

  return (
    <div className="flex gap-2 max-w-[90rem] mx-auto">
      <Aside user={user} />
      <div
        className="flex-[2] flex flex-col sm:h-screen sm:overflow-scroll sm:overflow-x-hidden"
        id="main"
      >
        {children}
      </div>
      <Extra userId={user.id} />
    </div>
  );
}

export default SocialLayout;
