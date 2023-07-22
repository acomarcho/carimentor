import { BookMentorRequest } from "@/lib/constants/requests";
import { City } from "@/lib/constants/responses";
import { labelStyle } from "@/lib/constants/styles";
import { useAllCities } from "@/lib/hooks/use-city";
import { useMentor, useUser } from "@/lib/hooks/use-user";
import { Textarea, LoadingOverlay } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
  IconMapPin,
  IconSignature,
  IconUserCircle,
  IconVocabulary,
} from "@tabler/icons-react";
import "dayjs/locale/id";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DecorationVector from "../../common/decoration-vector";

export default function BookMentor({ mentorId }: { mentorId: string }) {
  const { isLoading, isError } = useUser();
  const {
    user: mentor,
    userTags: mentorTags,
    isLoading: isMentorLoading,
    isError: isMentorError,
  } = useMentor(mentorId);
  const { cities, isLoading: isCityLoading } = useAllCities();

  const [request, setRequest] = useState<BookMentorRequest>({
    date: null,
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadingFlag =
    isMentorLoading || isMentorError || isCityLoading || isLoading || isError;

  const renderProfilePicture = () => {
    if (!mentor || !mentor.imageUrl) {
      return <IconUserCircle size={64} />;
    } else {
      return (
        <div className="w-[4rem] h-[4rem] relative rounded-full overflow-hidden">
          <Image
            alt={mentor.name}
            src={mentor.imageUrl}
            fill
            className="object-cover"
          />
        </div>
      );
    }
  };

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <div className="flex flex-row gap-[1rem] items-center flex-shrink-0">
        {renderProfilePicture()}
        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[1rem]">
            <IconSignature />
            <div className="subheader max-w-[100px] md:max-w-[400px]">
              {mentor?.name}
            </div>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconVocabulary />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {mentorTags &&
                mentorTags
                  .slice(0, 3)
                  .map((tag) => tag.name)
                  .join(", ")}
              {mentorTags &&
                mentorTags.length > 3 &&
                ` dan ${mentorTags.length - 3} ketertarikan lainnya`}
            </p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconMapPin />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {cities &&
                cities.data &&
                mentor &&
                cities.data.find((city: City) => city.id === mentor.cityId)!
                  .name}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl p-[1rem] bg-white drop-shadow-lg mt-[2rem]">
        <DateTimePicker
          label="Tanggal dan jam mulai"
          placeholder="Pilih tanggal dan jam mulai"
          withAsterisk
          minDate={new Date()}
          locale="id"
          radius="lg"
          styles={{ ...labelStyle }}
          value={request.date}
          onChange={(v) => setRequest({ ...request, date: v })}
        />
        <Textarea
          label="Pesan untuk mentormu"
          placeholder="Saya ingin belajar HTML dan CSS"
          withAsterisk
          className="mt-[1rem]"
          radius="lg"
          styles={{ ...labelStyle }}
          value={request.message}
          onChange={(e) =>
            setRequest({ ...request, message: e.currentTarget.value })
          }
          autosize
        />
        <button
          className="mt-[1rem] button-600-filled w-full"
          disabled={!request.date || !request.message}
          onClick={() => setIsModalOpen(true)}
        >
          Buat jadwal
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        center
        showCloseIcon={false}
        classNames={{
          modal: "rounded-xl",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-[1rem] p-[1rem] max-w-[293px]">
          <h1 className="subheader text-center">
            Request Jadwal Berhasil Dikirimkan
          </h1>
          <Image
            src="/images/modal-success.png"
            alt="Success checkmark"
            width={180}
            height={132.33}
          />
          <p className="paragraph text-center">
            Mentor akan menerima request kamu. Periksa status request secara
            berkala pada laman profil!
          </p>
          <Link href="/one-on-one" className="button-600-filled w-full">
            Lihat status request
          </Link>
        </div>
      </Modal>
    </div>
  );
}
