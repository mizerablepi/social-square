import ShopAside from "./Aside";
import ShopBody from "./Body";
import getUser from "@/helper/getUser";
import MobileHeader from "@/components/MobileHeader";
import MobileNavbar from "@/components/MobileNavbar";

async function Shop() {
  const user = await getUser();
  return (
    <div className="flex gap-6">
      <div className="flex-grow-[2] flex flex-col min-h-screen">
        <ShopBody />
      </div>
    </div>
  );
}

export default Shop;
