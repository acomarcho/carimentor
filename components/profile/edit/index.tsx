import { putProfile } from "@/lib/api/update-profile";
import { UpdateUserRequest } from "@/lib/constants/requests";
import { useUser } from "@/lib/hooks/use-user";
import {
  FileInput,
  MultiSelect,
  TextInput,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { IconUpload, IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import DecorationVector from "../../common/decoration-vector";
import { showSuccess, showError } from "@/lib/utils";
import { useTags } from "@/lib/hooks/use-tags";
import { useRouter } from "next/router";
import { postImgBB } from "@/lib/api/imgbb";

export default function EditProfile() {
  const { user, userTags, isLoading, isError } = useUser();
  const { tags: allTags, isLoading: isTagLoading } = useTags();

  const tags = useMemo(() => userTags ?? [], [userTags]);

  const [request, setRequest] = useState<UpdateUserRequest>({
    name: user?.name || "",
    description: user?.description || "",
    subscriptionStatus: user?.subscriptionStatus || "FREE",
    imageUrl: user?.imageUrl || "",
    cityId: user?.cityId || "",
    tags: tags.map((tag) => tag.id),
  });

  const router = useRouter();

  useEffect(() => {
    setRequest({
      name: user?.name || "",
      description: user?.description || "",
      subscriptionStatus: user?.subscriptionStatus || "FREE",
      imageUrl: user?.imageUrl || "",
      cityId: user?.cityId || "",
      tags: tags.map((tag) => tag.id),
    });
  }, [user, tags]);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const isShowLoadingOverlay =
    isLoading || isUpdating || isTagLoading || isError || isUploading;

  const renderProfilePicture = () => {
    if (!user || !request.imageUrl) {
      return <IconUserCircle size={128} />;
    } else {
      return (
        <div className="w-[8rem] h-[8rem] relative rounded-full overflow-hidden">
          <Image alt="" src={request.imageUrl} fill className="object-cover" />
        </div>
      );
    }
  };

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={isShowLoadingOverlay} overlayBlur={2} />
      <h1 className="header-2rem underline mb-[1rem]">Ubah Profilmu</h1>
      <div className="border-2 border-purple-600 bg-white rounded-xl p-[1rem] flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">
            Nama <span className="text-red-500">*</span>
          </h2>
          <TextInput
            radius="lg"
            placeholder="Masukkan nama"
            value={request.name}
            onChange={(event) => {
              setRequest({ ...request, name: event.currentTarget.value });
            }}
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
            value={file}
            onChange={(v) => {
              const handleUpload = async () => {
                if (!v) {
                  return;
                }

                const formData = new FormData();
                formData.append("image", v);

                try {
                  setIsUploading(true);
                  const response = await postImgBB(formData);
                  setFile(v);
                  showSuccess("Berhasil mengupload foto!");
                  setRequest({ ...request, imageUrl: response.data.data.url });
                } catch (error) {
                  showError("Gagal mengupload foto!");
                  setFile(null);
                } finally {
                  setIsUploading(false);
                }
              };

              handleUpload();
            }}
          />
          <TextInput disabled value={request.imageUrl} radius="lg" />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">
            Ketertarikan <span className="text-red-500">*</span>
          </h2>
          <MultiSelect
            clearable
            placeholder="Pilih yang Anda sukai!"
            data={
              allTags?.data?.map((tag) => {
                return {
                  value: tag.id,
                  label: tag.name,
                };
              }) || []
            }
            value={request.tags}
            onChange={(value) => {
              setRequest({ ...request, tags: value });
            }}
            radius="lg"
          />
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="header-600">
            Deskripsi <span className="text-red-500">*</span>
          </h2>
          <Textarea
            value={request.description}
            onChange={(e) =>
              setRequest({ ...request, description: e.currentTarget.value })
            }
            radius="lg"
            autosize
          />
        </div>
      </div>
      <button
        onClick={() => {
          const update = async () => {
            try {
              setIsUpdating(true);
              await putProfile(request, localStorage.getItem("token") || "");
              showSuccess("Berhasil mengubah profil!");
              router.push("/profile");
            } catch (error) {
              showError("Gagal mengubah profil!");
            } finally {
              setIsUpdating(false);
            }
          };

          update();
        }}
        disabled={
          !request.name || request.tags.length === 0 || !request.description
        }
        className="button-600-filled block w-full mt-[1rem]"
      >
        Ubah profil
      </button>
    </div>
  );
}
