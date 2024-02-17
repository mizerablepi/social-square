import getUser from "@/helper/getUser";
import Aside from "@/components/home/Aside";
import Body from "@/components/home/Body";
import Extra from "@/components/home/Extra";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex gap-2 max-w-[90rem] mx-auto">
      <Aside user={user} />
      <Body />
      <Extra userId={user.id} />
    </div>
  );
}
