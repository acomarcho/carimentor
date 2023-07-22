import DecorationVector from "../common/decoration-vector";
import {
  TextInput,
  PasswordInput,
  Radio,
  MultiSelect,
  Select,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import Link from "next/link";
import { RegisterRequest } from "@/lib/constants/requests";
import { useState } from "react";
import { validateEmail } from "@/lib/utils";
import { labelStyle } from "@/lib/constants/styles";
import { useProvince } from "@/lib/hooks/use-province";
import { useCity } from "@/lib/hooks/use-city";
import { useTags } from "@/lib/hooks/use-tags";
import { postRegister } from "@/lib/api/register";
import { showSuccess, showError } from "@/lib/utils";
import { useRouter } from "next/router";

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
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);

  const { provinces, isLoading, isError } = useProvince();
  const {
    cities,
    isLoading: isLoading2,
    isError: isError2,
  } = useCity(request.provinceId || "11");
  const { tags, isLoading: isLoading3, isError: isError3 } = useTags();

  const router = useRouter();

  const isShowLoadingOverlay =
    isLoading ||
    isLoading2 ||
    isError ||
    isError2 ||
    isLoading3 ||
    isError3 ||
    isRegisterLoading;

  const emailValidity = validateEmail(request.email)
    ? ""
    : "Format email tidak benar!";

  if (currentPage === 0) {
    return (
      <div className="default-wrapper flex flex-col justify-center items-center">
        <LoadingOverlay visible={isShowLoadingOverlay} overlayBlur={2} />
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
          <Radio.Group
            className="max-w-form"
            label="Role"
            withAsterisk
            value={request.role}
            onChange={(v) => setRequest({ ...request, role: v })}
            styles={{ ...labelStyle }}
          >
            <div className="flex gap-[1rem]">
              <Radio value="MENTOR" label="Mentor" styles={{ ...labelStyle }} />
              <Radio value="MENTEE" label="Mentee" styles={{ ...labelStyle }} />
            </div>
          </Radio.Group>
          <MultiSelect
            className="max-w-form"
            radius="xl"
            label="Ketertarikan"
            placeholder="Pilih semua yang Anda sukai!"
            withAsterisk
            clearable
            searchable
            data={
              tags
                ? tags.data.map((tag) => {
                    return {
                      value: tag.id,
                      label: tag.name,
                    };
                  })
                : []
            }
            value={request.tagIds}
            onChange={(v) => setRequest({ ...request, tagIds: v })}
            styles={{ ...labelStyle }}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
          <button
            className="button-600-filled max-w-form"
            onClick={() => setCurrentPage(1)}
            disabled={
              !request.email ||
              emailValidity !== "" ||
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
        <LoadingOverlay visible={isShowLoadingOverlay} overlayBlur={2} />
        <DecorationVector />
        <h1 className="header-2rem">Lengkapi profilmu</h1>
        <div className="flex flex-col gap-[1rem] w-full mt-[2rem]">
          <TextInput
            className="max-w-form"
            label="Nama"
            withAsterisk
            placeholder="Masukkan nama"
            radius="xl"
            value={request.name}
            onChange={(e) => {
              setRequest({ ...request, name: e.currentTarget.value });
            }}
            styles={{ ...labelStyle }}
          />
          <Select
            className="max-w-form"
            label="Provinsi"
            withAsterisk
            placeholder="Pilih provinsi"
            radius="xl"
            searchable
            data={
              provinces
                ? provinces.data.map((province) => {
                    return {
                      value: province.id,
                      label: province.name,
                    };
                  })
                : []
            }
            value={request.provinceId}
            onChange={(v) => {
              setRequest({ ...request, provinceId: v, cityId: null });
            }}
            styles={{ ...labelStyle }}
          />
          <Select
            className="max-w-form"
            label="Kota"
            withAsterisk
            placeholder="Pilih kota"
            radius="xl"
            searchable
            data={
              cities
                ? cities.data.map((city) => {
                    return {
                      value: city.id,
                      label: city.name,
                    };
                  })
                : []
            }
            value={request.cityId}
            onChange={(v) => {
              setRequest({ ...request, cityId: v });
            }}
            disabled={!request.provinceId}
            styles={{ ...labelStyle }}
          />
          <Textarea
            className="max-w-form"
            radius="lg"
            label="Deskripsi"
            withAsterisk
            placeholder="Deskripsi singkat tentang Anda"
            autosize
            maxRows={4}
            value={request.description}
            onChange={(e) => {
              setRequest({ ...request, description: e.currentTarget.value });
            }}
            styles={{ ...labelStyle }}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-[1rem] mt-[6rem]">
          <button
            className="button-600-filled max-w-form"
            disabled={
              !request.name ||
              !request.provinceId ||
              !request.cityId ||
              !request.description
            }
            onClick={() => {
              const onRegister = async () => {
                try {
                  setIsRegisterLoading(true);
                  await postRegister(request);
                  showSuccess(
                    "Akun berhasil dibuat! Silakan masuk ke akun Anda."
                  );
                  router.push("/login");
                } catch (error) {
                  showError("Akun gagal dibuat! Email Anda sudah digunakan.");
                } finally {
                  setIsRegisterLoading(false);
                }
              };

              onRegister();
            }}
          >
            Daftar
          </button>
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
