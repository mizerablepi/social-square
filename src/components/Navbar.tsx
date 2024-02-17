import Link from "next/link";
import Image from "next/image";
import home from "@/assets/home-variant.svg";
import cart from "@/assets/cart-outline.svg";
import chat from "@/assets/message.svg";

function Navbar({ page }: { page: string }) {
  return (
    <nav className="flex bg-gray-800 rounded-lg self-center sticky top-3 px-5 py-2 items-center gap-6">
      <div
        className={`active:bg-indigo-800 px-2 rounded transition flex items-center py-1.5 ${
          page == "home" ? "bg-blue-900" : ""
        }`}
      >
        <Link href={"/"} className="">
          <Image src={home} alt="home" width={28} />
        </Link>
      </div>
      <div
        className={`active:bg-indigo-800 px-2 rounded transition flex items-center py-1.5 ${
          page == "shop" ? "bg-blue-900" : ""
        }`}
      >
        <Link href={"/shop"} className="active:bg-slate-800">
          <Image src={cart} alt="home" width={28} />
        </Link>
      </div>
      <div
        className={`active:bg-indigo-800 px-2 rounded transition flex items-center py-1.5 ${
          page == "chat" ? "bg-blue-900" : ""
        }`}
      >
        <Link href={"/chat"} className="active:bg-slate-800">
          <Image src={chat} alt="home" width={28} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
