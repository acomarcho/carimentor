import DecorationVector from "../common/decoration-vector";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { dummyTags } from "@/lib/dummies";
import { Radio, Checkbox, MultiSelect } from "@mantine/core";
import { labelStyle } from "@/lib/constants/styles";

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
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="filter-subheader">Lokasi</h2>
            <Radio.Group className="flex flex-col items-start gap-[0.5rem]">
              <Radio
                value="NONE"
                label="Semua tempat"
                styles={{ ...labelStyle }}
              />
              <Radio
                value="PROVINCE"
                label="Provinsi yang sama"
                styles={{ ...labelStyle }}
              />
              <Radio
                value="CITY"
                label="Kota yang sama"
                styles={{ ...labelStyle }}
              />
            </Radio.Group>
          </div>
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="filter-subheader">Status mentor</h2>
            <Checkbox label="Premium saja" styles={{ ...labelStyle }} />
          </div>
          <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
            <h2 className="filter-subheader">Ketertarikan</h2>
            <MultiSelect
              radius="xl"
              data={tags.map((tag) => {
                return {
                  value: tag.id,
                  label: tag.name,
                };
              })}
              placeholder="Pilih semua yang Anda sukai!"
              clearable
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
