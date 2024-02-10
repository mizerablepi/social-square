import home from "@/assets/home-variant.svg";
import cart from "@/assets/cart-outline.svg";
import chat from "@/assets/message.svg";
import Image from "next/image";
import Link from "next/link";

function MobileNavbar() {
  return (
    <nav className="sticky bottom-0 px-3 bg-slate-900 flex justify-around sm:hidden">
      <div className="active:bg-slate-800 p-3 rounded transition">
        <Link href={"/"} className="">
          <Image src={home} alt="home" width={28} />
        </Link>
      </div>
      <div className="active:bg-slate-800 p-3 rounded transition">
        <Link href={"/shop"} className="active:bg-slate-800">
          <Image src={cart} alt="home" width={28} />
        </Link>
      </div>
      <div className="active:bg-slate-800 p-3 rounded transition">
        <Link href={"/chat"} className="active:bg-slate-800">
          <Image src={chat} alt="home" width={28} />
        </Link>
      </div>
    </nav>
  );
}

export default MobileNavbar;
