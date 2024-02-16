import GrayCard from "../GrayCard";
import Link from "next/link";
import Image from "next/image";

function ProfileCard({ user }: { user: any }) {
  return (
    <GrayCard classname="flex flex-col">
      <div className="bg-[url('/banner.jpg')] flex justify-center bg-contain rounded-t-lg">
        <Image
          src={user.profilePicture}
          alt="profile pic"
          height={65}
          width={65}
          className="rounded-full  w-[65px] h-[65px] my-1 object-cover relative -bottom-7"
        />
      </div>
      <div className="mt-7 flex flex-col items-center">
        <span className="font-bold text-lg">{user.name}</span>
        <span className="text-xs font-semibold text-gray-400">
          @{user.username}
        </span>
      </div>
      <div className="border-y border-gray-700 my-3 px-2 py-2.5 flex justify-center">
        <div className="flex flex-col items-center px-4 border-r border-gray-700">
          <span className="font-bold text-sm text-gray-300">
            {user.following.length}
          </span>
          <span className="text-sm text-gray-300">Following</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="font-bold text-sm text-gray-300">
            {user.followers.length}
          </span>
          <span className="text-sm text-gray-300">Followers</span>
        </div>
      </div>
      <div className="text-center font-bold text-sm text-blue-300 pb-2">
        <Link href="/profile">My Profile</Link>
      </div>
    </GrayCard>
  );
}

export default ProfileCard;
