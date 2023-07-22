import DecorationVector from "../common/decoration-vector";
import { TextInput, PasswordInput, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useState } from "react";
import { LoginRequest } from "@/lib/constants/requests";
import { validateEmail } from "@/lib/utils";
import { labelStyle } from "@/lib/constants/styles";
import { useRouter } from "next/router";
import { postLogin } from "@/lib/api/login";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function Login() {
  const [request, setRequest] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const emailValidity = validateEmail(request.email)
    ? ""
    : "Format email tidak benar!";

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoadingShown = isLoading;

  const router = useRouter();

  return (
    <div className="default-wrapper flex flex-col justify-center items-center">
      <LoadingOverlay visible={isLoadingShown} overlayBlur={2} />
      <DecorationVector />
      <h1 className="header-2rem">Masuk ke akun Anda</h1>
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
          error={request.email && emailValidity}
          styles={{ ...labelStyle }}
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
          styles={{ ...labelStyle }}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
        <button
          type="submit"
          className="button-600-filled max-w-form"
          onClick={(e) => {
            e.preventDefault();
            const onLogin = async () => {
              try {
                setIsLoading(true);
                const response = await postLogin(request);
                notifications.show({
                  message: `Selamat datang, ${response.data.user.name}!`,
                  color: "teal",
                  icon: <IconCheck size="1rem" />
                });
                localStorage.setItem("token", response.data.token);
                router.push("/");
              } catch (error) {
                notifications.show({
                  message: "Login gagal! Mohon cek ulang identitas Anda.",
                  color: "red",
                  icon: <IconX size="1rem" />
                });
              } finally {
                setIsLoading(false);
              }
            };
            onLogin();
          }}
          disabled={!request.email || emailValidity !== "" || !request.password}
        >
          Masuk
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
