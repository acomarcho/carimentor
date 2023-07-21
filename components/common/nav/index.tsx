import { useState } from "react";
import { appName } from "@/lib/constants";
import { IconMenu2 } from "@tabler/icons-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";

const MobileNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const renderDrawer = () => {
    return (
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="right"
        size="60%"
        className="p-[1rem]"
      >
        <p>Sample drawer content</p>
      </Drawer>
    );
  };
  return (
    <div className="lg:hidden">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="font-outfit font-bold text-[1rem] text-purple-950"
        >
          {appName}
        </Link>
        <button onClick={() => setIsDrawerOpen(true)}>
          <IconMenu2 size={24} color={"#120b53"} />
        </button>
      </div>
      {renderDrawer()}
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden lg:block">
      <h1>Desktop navbar</h1>
    </div>
  );
};

export default function Navbar() {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
}
