import DecorationVector from "@/components/common/decoration-vector";
import { dummyGroupSessions } from "@/lib/dummies";
import { IconBrowser, IconCalendar, IconUsers } from "@tabler/icons-react";
import { formatDateToIndonesianLocale } from "@/lib/utils";
import Link from "next/link";

export default function MentorGroupSessions() {
  const sessions = dummyGroupSessions;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <h1 className="header-2rem underline">Sesi Grup Anda</h1>
      <button className="button-600-filled mt-[1rem]">Buat sesi baru</button>
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
    </div>
  );
}
