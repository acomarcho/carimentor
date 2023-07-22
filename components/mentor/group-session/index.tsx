import DecorationVector from "@/components/common/decoration-vector";
import { dummyGroupSessions } from "@/lib/dummies";
import { IconBrowser, IconCalendar, IconUsers } from "@tabler/icons-react";
import { formatDateToIndonesianLocale } from "@/lib/utils";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { DateTimePicker } from "@mantine/dates";
import "dayjs/locale/id";
import { Textarea, TextInput, NumberInput } from "@mantine/core";
import { labelStyle } from "@/lib/constants/styles";
import { CreateNewGroupSessionRequest } from "@/lib/constants/requests";
import { requestToBodyStream } from "next/dist/server/body-streams";

export default function MentorGroupSessions() {
  const sessions = dummyGroupSessions;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<CreateNewGroupSessionRequest>({
    name: "",
    date: null,
    meetingUrl: "",
    description: "",
    maxParticipant: "",
  });

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <h1 className="header-2rem underline">Sesi Grup Anda</h1>
      <button
        className="button-600-filled mt-[1rem]"
        onClick={() => setIsModalOpen(true)}
      >
        Buat sesi baru
      </button>
      {sessions.length === 0 && (
        <p className="paragraph">Anda belum pernah membuat sesi grup.</p>
      )}
      {sessions.length > 0 &&
        sessions.map((session) => {
          return (
            <div
              key={session.id}
              className="bg-white rounded-xl drop-shadow-xl p-[1rem] mt-[1rem]"
            >
              <h2 className="paragraph font-bold">{session.name}</h2>
              <div className="flex gap-[0.5rem] items-center mt-[0.5rem]">
                <IconCalendar />
                <p className="paragraph">
                  {formatDateToIndonesianLocale(session.date)}
                </p>
              </div>
              <div className="flex gap-[0.5rem] items-center mt-[0.5rem]">
                <IconBrowser />
                <Link className="paragraph" href={session.meetingUrl}>
                  {session.meetingUrl}
                </Link>
              </div>
              <div className="flex gap-[0.5rem] items-center mt-[0.5rem]">
                <IconUsers />
                <p className="paragraph">
                  {session.bookedCount}/{session.maxParticipant}
                </p>
              </div>
              <Link
                href={`/group-session/${session.id}`}
                className="inline-block button-600-filled mt-[0.5rem]"
              >
                Lihat sesi
              </Link>
            </div>
          );
        })}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "rounded-xl" }}
      >
        <div className="flex flex-col justify-center gap-[1rem] p-[1rem] max-w-[293px]">
          <h1 className="subheader">Buat sesi grup baru</h1>
          <p className="paragraph">
            Isi formulir di bawah ini untuk membuat sesi grup baru!
          </p>
          <TextInput
            label="Nama sesi"
            placeholder="Belajar HTML dan CSS untuk pemula"
            withAsterisk
            styles={{ ...labelStyle }}
            value={request.name}
            onChange={(e) =>
              setRequest({ ...request, name: e.currentTarget.value })
            }
          />
          <DateTimePicker
            label="Tanggal dan jam mulai"
            placeholder="Pilih tanggal dan jam mulai"
            withAsterisk
            minDate={new Date()}
            locale="id"
            styles={{ ...labelStyle }}
            value={request.date}
            onChange={(v) => setRequest({ ...request, date: v })}
          />
          <TextInput
            label="Tautan meeting"
            placeholder="https://www.google.com"
            withAsterisk
            styles={{ ...labelStyle }}
            value={request.meetingUrl}
            onChange={(e) =>
              setRequest({ ...request, meetingUrl: e.currentTarget.value })
            }
          />
          <Textarea
            label="Deskripsi"
            placeholder="Dalam sesi ini, kita akan mempelajari HTML dan CSS dari awal sampai akhir."
            styles={{ ...labelStyle }}
            withAsterisk
            value={request.description}
            onChange={(e) =>
              setRequest({ ...request, description: e.currentTarget.value })
            }
          />
          <NumberInput
            label="Maksimal partisipan"
            placeholder="50"
            styles={{ ...labelStyle }}
            min={1}
            withAsterisk
            value={request.maxParticipant}
            onChange={(v) => setRequest({ ...request, maxParticipant: v })}
          />
          <button
            className="button-600-filled"
            onClick={() => setIsModalOpen(false)}
            disabled={
              !request.name ||
              !request.date ||
              !request.meetingUrl ||
              !request.description ||
              !request.maxParticipant
            }
          >
            Buat sesi
          </button>
        </div>
      </Modal>
    </div>
  );
}
