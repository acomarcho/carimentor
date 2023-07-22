import { apiURL } from "@/lib/constants";
import { City, GetCityDetailResponse } from "@/lib/constants/responses";
import { useUser } from "@/lib/hooks/use-user";
import { LoadingOverlay, Textarea } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DecorationVector from "../common/decoration-vector";

const fetchCity = (cityId: string) => {
  return axios.get<GetCityDetailResponse>(`${apiURL}/city/${cityId}`);
};

export default function MyProfile() {
  const { user, userTags, isLoading, isError } = useUser();

  const [city, setCity] = useState<City | null>(null);
  useEffect(() => {
    if (user) {
      fetchCity(user.cityId).then((d) => {
        setCity(d.data.data);
      });
    }
  }, [user]);

  const renderProfilePicture = () => {
    if (!user || !user.imageUrl) {
      return <IconUserCircle size={128} />;
    } else {
      return (
        <div className="w-[8rem] h-[8rem] relative rounded-full overflow-hidden">
          <Image alt="" src={user.imageUrl} fill className="object-cover" />
        </div>
      );
    }
  };

  const isShowLoadingOverlay = isLoading || isError;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={isShowLoadingOverlay} overlayBlur={2} />
      <h1 className="header-2rem underline mb-[1rem]">Profilmu</h1>
      <div className="flex justify-center mb-[1rem]">
        {renderProfilePicture()}
      </div>
      <div className="border-2 border-purple-600 bg-white rounded-xl p-[1rem] flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Nama</h2>
          <p className="paragraph">{user?.name}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Email</h2>
          <p className="paragraph">{user?.email}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Domisili</h2>
          <p className="paragraph">{city?.name}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Role</h2>
          <p className="paragraph">{user?.role}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Ketertarikan</h2>
          <p className="paragraph">{userTags.map((e) => e.name).join(", ")}</p>
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Deskripsi</h2>
          <p className="paragraph">{user?.description}</p>
        </div>
      </div>
      <Link href="/profile/edit" className="button-600-filled block mt-[1rem]">
        Ubah profil
      </Link>
    </div>
  );
}
