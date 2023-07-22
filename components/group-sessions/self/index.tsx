import DecorationVector from "@/components/common/decoration-vector";
import { IconCalendar, IconBrowser } from "@tabler/icons-react";
import { formatDateToIndonesianLocale } from "@/lib/utils";
import Link from "next/link";
import { useAllGroupSessions } from "@/lib/hooks/use-group-session";
import { LoadingOverlay } from "@mantine/core";

export default function MyGroupSessions() {
  const { groupSessions: sessions, isLoading, isError } = useAllGroupSessions();
  
  const loadingFlag = isLoading || isError;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <h1 className="header-2rem underline">Riwayat Sesi Grup</h1>
      {sessions.length === 0 && (
        <p className="paragraph">Anda belum pernah mengikuti sesi grup</p>
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
