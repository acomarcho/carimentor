import DecorationVector from "../common/decoration-vector";
import { TextInput, PasswordInput, Radio, MultiSelect } from "@mantine/core";
import Link from "next/link";
import { dummyTags } from "@/lib/dummies";

export default function Register() {
  const tags = dummyTags;

  return (
    <div className="default-wrapper flex flex-col justify-center items-center">
      <DecorationVector />
      <h1 className="header-2rem">Buat akun</h1>
      <div className="flex flex-col gap-[1rem] w-full mt-[2rem]">
        <TextInput
          className="max-w-form"
          label="Email"
          withAsterisk
          placeholder="Masukkan email"
          radius="xl"
        />
        <PasswordInput
          className="max-w-form"
          label="Password"
          withAsterisk
          placeholder="Masukkan password"
          radius="xl"
        />
        <Radio.Group className="max-w-form" label="Role" withAsterisk>
          <div className="flex gap-[1rem]">
            <Radio value="MENTOR" label="Mentor" />
            <Radio value="MENTEE" label="Mentee" />
          </div>
        </Radio.Group>
        <MultiSelect
          className="max-w-form"
          label="Ketertarikan"
          placeholder="Pilih semua yang Anda sukai!"
          withAsterisk
          clearable
          data={tags.map((tag) => {
            return {
              value: tag.id,
              label: tag.name,
            };
          })}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[8rem]">
        <button className="button-600-filled max-w-form">Lanjutkan</button>
        <p className="paragraph">
          {"Punya akun? "}
          <Link href="/login" className="text-purple-600">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
