import DecorationVector from "../../common/decoration-vector";
import { IconUserCircle, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import { dummyUser, dummyTags } from "@/lib/dummies";
import { Textarea, TextInput, FileInput, MultiSelect } from "@mantine/core";

export default function EditProfile() {
  const isAuthenticated = false;
  const user = dummyUser;
  const tags = dummyTags;

  const renderProfilePicture = () => {
    if (isAuthenticated) {
      return (
        <div className="w-[8rem] h-[8rem] relative rounded-full overflow-hidden">
          <Image alt="" src="/next.svg" fill className="object-cover" />
        </div>
      );
    } else {
      return <IconUserCircle size={128} />;
    }
  };

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <h1 className="header-2rem underline mb-[1rem]">Ubah Profilmu</h1>
      <div className="border-2 border-purple-600 bg-white rounded-xl p-[1rem] flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">
            Nama <span className="text-red-500">*</span>
          </h2>
          <TextInput
            radius="lg"
            placeholder="Masukkan nama"
            value={user.name}
          />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Gambar profil</h2>
          <div className="flex justify-center mb-[1rem]">
            {renderProfilePicture()}
          </div>
          <FileInput
            radius="lg"
            placeholder="Pilih gambar untuk diupload"
            accept="image/png,image/jpeg"
            icon={<IconUpload size={16} />}
          />
          <TextInput disabled value="https://www.google.com" radius="lg" />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">
            Ketertarikan <span className="text-red-500">*</span>
          </h2>
          <MultiSelect
            clearable
            placeholder="Pilih yang Anda sukai!"
            data={tags.map((tag) => {
              return {
                value: tag.id,
                label: tag.name,
              };
            })}
            radius="lg"
          />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">Deskripsi</h2>
          <Textarea value={user.description} radius="lg" autosize />
        </div>
      </div>
      <button
        onClick={() => {}}
        className="button-600-filled block w-full mt-[1rem]"
      >
        Ubah profil
      </button>
    </div>
  );
}
