import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/account-circle-outline.svg";

function MobileHeader({ profilePic }: { profilePic?: string }) {
  return (
    <header className="sm:hidden p-3 bg-slate-900 flex z-10 sticky top-0 shadow-lg items-center gap-6">
      <Link href={"/profile"}>
        <Image
          src={profilePic ?? userIcon}
          alt="Logo"
          width={40}
          height={40}
          className="border rounded-full border-blue-900"
        />
      </Link>
      <div className="flex flex-1">
        <div className="font-bold self-center bg-[#1e2c36] rounded-l-xl pb-[0.15rem] pt-[0.1rem] pl-3 text-center text-lg">
          #
        </div>
        <input
          type="text"
          name="searchbar"
          id="mobileSearch"
          className="bg-[#1e2c36] self-center rounded-r-xl pt-[0.37rem] pb-[0.43rem] pl-2 text-sm focus-visible:outline-none w-full"
          placeholder="Explore"
        />
      </div>
    </header>
  );
}

export default MobileHeader;
