import DecorationVector from "../common/decoration-vector";
import {
  TextInput,
  PasswordInput,
  Radio,
  MultiSelect,
  Select,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import { dummyTags, dummyProvinces, dummyCities } from "@/lib/dummies";
import { RegisterRequest } from "@/lib/constants/requests";
import { useState } from "react";

export default function Register() {
  const [request, setRequest] = useState<RegisterRequest>({
    email: "",
    password: "",
    role: "",
    tagIds: [],
    name: "",
    provinceId: "",
    cityId: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(0);

  const tags = dummyTags;
  const provinces = dummyProvinces;
  const cities = dummyCities;

  if (currentPage === 0) {
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
            value={request.email}
            onChange={(e) => {
              setRequest({ ...request, email: e.currentTarget.value });
            }}
          />
          <PasswordInput
            className="max-w-form"
            label="Password"
            withAsterisk
            placeholder="Masukkan password"
            radius="xl"
            value={request.password}
            onChange={(e) => {
              setRequest({ ...request, password: e.currentTarget.value });
            }}
          />
          <Radio.Group
            className="max-w-form"
            label="Role"
            withAsterisk
            value={request.role}
            onChange={(v) => setRequest({ ...request, role: v })}
          >
            <div className="flex gap-[1rem]">
              <Radio value="MENTOR" label="Mentor" />
              <Radio value="MENTEE" label="Mentee" />
            </div>
          </Radio.Group>
          <MultiSelect
            className="max-w-form"
            radius="xl"
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
            value={request.tagIds}
            onChange={(v) => setRequest({ ...request, tagIds: v })}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
          <button
            className="button-600-filled max-w-form"
            onClick={() => setCurrentPage(1)}
            disabled={
              !request.email ||
              !request.password ||
              !request.role ||
              request.tagIds.length === 0
            }
          >
            Lanjutkan
          </button>
          <p className="paragraph">
            {"Punya akun? "}
            <Link href="/login" className="text-purple-600">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="default-wrapper flex flex-col justify-center items-center">
        <DecorationVector />
        <h1 className="header-2rem">Lengkapi profilmu</h1>
        <div className="flex flex-col gap-[1rem] w-full mt-[2rem]">
          <TextInput
            className="max-w-form"
            label="Nama"
            withAsterisk
            placeholder="Masukkan nama"
            radius="xl"
          />
          <Select
            className="max-w-form"
            label="Provinsi"
            withAsterisk
            placeholder="Pilih provinsi"
            radius="xl"
            data={provinces.map((province) => {
              return {
                value: province.id,
                label: province.name,
              };
            })}
          />
          <Select
            className="max-w-form"
            label="Kota"
            withAsterisk
            placeholder="Pilih kota"
            radius="xl"
            data={cities.map((city) => {
              return {
                value: city.id,
                label: city.name,
              };
            })}
          />
          <Textarea
            className="max-w-form"
            radius="lg"
            label="Deskripsi"
            withAsterisk
            placeholder="Deskripsi singkat tentang Anda"
            autosize
            maxRows={4}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
          <button className="button-600-filled max-w-form">Daftar</button>
          <button
            className="button-600-outline max-w-form"
            onClick={() => setCurrentPage(0)}
          >
            Kembali
          </button>
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
}
