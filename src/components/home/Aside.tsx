import Image from "next/image";
import GrayCard from "../GrayCard";

function Aside({ profilePic }: { profilePic: string }) {
  const image = profilePic;
  return (
    <aside className="hidden sm:block">
      <div className="flex-1 py-4 pl-4 flex flex-col gap-4">
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
        {/* <GrayCard>{image}</GrayCard> */}
      </div>
    </aside>
  );
}

export default Aside;
