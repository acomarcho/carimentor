import DecorationVector from "../common/decoration-vector";
import { appName } from "@/lib/constants";
import Link from "next/link";
import { dummyGroupSessions } from "@/lib/dummies";
import { IconCalendar, IconUserCircle } from "@tabler/icons-react";
import { formatDateToIndonesianLocale } from "@/lib/utils";

export default function GroupSessions() {
  const groupSessions = dummyGroupSessions;
  return (
    <div className="default-wrapper flex flex-col gap-[1rem] items-center justify-center">
      <DecorationVector />
      <h1 className="header-2rem text-center">Sesi grup/workshop</h1>
      <p className="paragraph text-center">
        Tambah pengetahuanmu dengan mengikuti sesi grup/workshop yang dibuat
        oleh mentor-mentor {appName}!
      </p>
      <Link href="/" className="paragraph">
        <span className="text-purple-600">Ingin mencari mentor?</span>
      </Link>
      {groupSessions.map((session) => {
        return (
          <Link
            href={`/group-session/${session.id}`}
            key={session.id}
            className="bg-white rounded-lg drop-shadow-xl p-[1rem] w-full"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-[0.5rem]">
                <h2 className="subheader">{session.name}</h2>
                <div className="flex gap-[0.5rem] items-center">
                  <IconCalendar />
                  <p className="paragraph text-sm">
                    {formatDateToIndonesianLocale(session.date)}
                  </p>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <IconUserCircle />
                  <p className="paragraph text-sm font-bold">
                    {session.mentorName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="subheader">
                  {session.maxParticipant - session.bookedCount}
                </h2>
                <p className="paragraph">sisa slot</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
