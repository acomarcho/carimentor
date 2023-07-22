import DecorationVector from "../../common/decoration-vector";
import {
  dummyMentorWithPicture,
  dummyMentorWithoutPicture,
} from "@/lib/dummies";
import {
  IconUserCircle,
  IconMapPin,
  IconVocabulary,
  IconSignature,
} from "@tabler/icons-react";
import Image from "next/image";
import { Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "dayjs/locale/id";
import { labelStyle } from "@/lib/constants/styles";
import { useState } from "react";
import { BookMentorRequest } from "@/lib/constants/requests";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Link from "next/link";

export default function BookMentor({ mentorId }: { mentorId: string }) {
  const mentor = dummyMentorWithPicture;

  const [request, setRequest] = useState<BookMentorRequest>({
    date: null,
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const renderProfilePicture = () => {
    if (!mentor.imageUrl) {
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
      <div className="flex flex-row gap-[1rem] items-center flex-shrink-0">
        {renderProfilePicture()}
        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[1rem]">
            <IconSignature />
            <div className="subheader max-w-[100px] md:max-w-[400px]">
              {mentor.name}
            </div>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconVocabulary />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {mentor.tags.slice(0, 2).join(", ")}
              {mentor.tags.length > 2 &&
                ` dan ${mentor.tags.length - 2} ketertarikan lainnya`}
            </p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconMapPin />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {mentor.city}
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
