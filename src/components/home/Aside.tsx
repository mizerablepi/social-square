import Image from "next/image";
import GrayCard from "../GrayCard";
import createIcon from "@/assets/pencil.svg";
import ProfileCard from "./ProfileCard";
import SuggestionCard from "./SuggestionCard";
import Link from "next/link";

function Aside({ user }: { user: any }) {
  return (
    <aside className="flex-1 flex-col hidden sm:flex gap-4 overflow-scroll h-screen pl-4 overflow-x-hidden">
      <div className="pt-4 flex flex-col gap-4 ">
        <div className="flex gap-2 px-1">
          <Image
            src="/logo_black.png"
            alt="SocialSquare"
            className="size-9"
            width={36}
            height={36}
            priority={true}
          />
          <div className="flex">
            <div className="font-bold self-center bg-[#1e2c36] rounded-l-xl pb-[0.2rem] pt-[0.1rem] pl-3 text-center text-lg">
              #
            </div>
            <input
              type="text"
              name="searchbar"
              id="search"
              className="bg-[#1e2c36] self-center rounded-r-xl pt-[0.37rem] pb-[0.43rem] pl-2 text-sm focus-visible:outline-none w-full"
              placeholder="Explore"
            />
          </div>
        </div>
      </div>
      <ProfileCard user={user} />
      <GrayCard classname="p-2">
        <h4 className="font-bold mb-2">Suggested For You: </h4>
        <SuggestionCard user={user} />
      </GrayCard>

      <Link
        href="/createPost"
        className="flex gap-1 items-center mt-auto mb-2 bg-[#3cc2c9] self-center px-5 py-1.5 rounded-lg sticky bottom-2"
      >
        <Image src={createIcon} alt="Create post" width={20} height={20} />
        <span className="font-bold">Create</span>
      </Link>
    </aside>
  );
}

export default Aside;
