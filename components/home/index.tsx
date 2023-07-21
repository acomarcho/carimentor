import DecorationVector from "../common/decoration-vector";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { dummyTags } from "@/lib/dummies";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const tags = dummyTags;

  return (
    <div className="default-wrapper flex flex-col gap-[1rem] items-center justify-center">
      <DecorationVector />
      <h1 className="header-2rem">Ingin belajar apa Anda hari ini?</h1>
      <p className="paragraph">Cari mentor yang sesuai dengan kebutuhanmu!</p>
      <button
        className="button-600-filled max-w-form"
        onClick={() => setIsFilterOpen(true)}
      >
        Atur filter pencarian mentor
      </button>
      <Drawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        direction="bottom"
        size="32rem"
        className="p-[1rem]"
      >
        <div className="max-w-[1160px] mx-auto p-[1.25rem]">
          <h1 className="header-2rem">Filter pencarian</h1>
        </div>
      </Drawer>
    </div>
  );
}
