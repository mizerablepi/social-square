import ShopAside from "@/components/shop/Aside";
import ShopBody from "@/components/shop/Body";
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
