import { useState } from "react";
import { appName } from "@/lib/constants";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";
import { button950Filled, button950Outline } from "@/lib/styles";

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
        <div className="flex flex-col gap-[1.5rem]">
          <button className="self-end" onClick={() => setIsDrawerOpen(false)}>
            <IconX />
          </button>
          <Link className="text-right font-jakarta text-purple-950" href="/">
            Tentang Kami
          </Link>
          <div className="h-[2px] bg-purple-950" />
          <Link href="/register" className={`${button950Outline}`}>
            Daftar
          </Link>
          <Link href="/login" className={`${button950Filled}`}>
            Masuk
          </Link>
        </div>
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
    <nav className="fixed top-0 left-0 w-full p-[1.25rem] z-[100] drop-shadow-xl">
      <MobileNavbar />
      <DesktopNavbar />
    </nav>
  );
}
