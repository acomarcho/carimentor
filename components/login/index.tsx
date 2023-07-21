import DecorationVector from "../common/decoration-vector";
import { TextInput, PasswordInput } from "@mantine/core";
import Link from "next/link";

export default function Login() {
  return (
    <div className="default-wrapper flex flex-col justify-center items-center">
      <DecorationVector />
      <h1 className="header-2rem">Masuk ke akun Anda</h1>
      <div className="flex flex-col gap-[1rem] w-full mt-[2rem]">
        <TextInput
          className="max-w-form"
          label="Email"
          withAsterisk
          placeholder="Masukkan email"
          radius="xl"
          // value={request.email}
          // onChange={(e) => {
          //   setRequest({ ...request, email: e.currentTarget.value });
          // }}
        />
        <PasswordInput
          className="max-w-form"
          label="Password"
          withAsterisk
          placeholder="Masukkan password"
          radius="xl"
          // value={request.password}
          // onChange={(e) => {
          //   setRequest({ ...request, password: e.currentTarget.value });
          // }}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
        <button
          className="button-600-filled max-w-form"
          // onClick={() => setCurrentPage(1)}
          // disabled={
          //   !request.email ||
          //   !request.password ||
          // }
        >
          Lanjutkan
        </button>
        <p className="paragraph">
          {"Belum punya akun? "}
          <Link href="/register" className="text-purple-600">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
