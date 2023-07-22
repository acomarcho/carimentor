import { apiURL, appName } from "@/lib/constants";
import { GetUserResponse, User } from "@/lib/constants/responses";
import { useAllGroupSessions } from "@/lib/hooks/use-group-session";
import { formatDateToIndonesianLocale } from "@/lib/utils";
import { LoadingOverlay } from "@mantine/core";
import { IconCalendar, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import DecorationVector from "../common/decoration-vector";

const fetchUser = (id: string) => {
  return axios.get<GetUserResponse>(`${apiURL}/user/${id}`);
};

export default function GroupSessions() {
  const [mentors, setMentors] = useState<User[]>([]);
  const { groupSessions, isLoading, isError } = useAllGroupSessions();

  useEffect(() => {
    Promise.all(
      groupSessions.map(async (session) => {
        const mentor = await fetchUser(session.mentorId);
        return mentor.data.data;
      })
    ).then((e) => setMentors(e));
  }, [groupSessions]);

  const loadingFlag = isLoading || isError;

  return (
    <div className="default-wrapper flex flex-col gap-[1rem] items-center justify-center">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <h1 className="header-2rem text-center">Sesi grup/workshop</h1>
      <p className="paragraph text-center">
        Tambah pengetahuanmu dengan mengikuti sesi grup/workshop yang dibuat
        oleh mentor-mentor {appName}!
      </p>
      <Link href="/" className="paragraph">
        <span className="text-purple-600">Ingin mencari mentor?</span>
      </Link>
      {mentors.map((mentor, idx) => {
        const session = groupSessions[idx];
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
                    {session.date && formatDateToIndonesianLocale(session.date)}
                  </p>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <IconUserCircle />
                  <p className="paragraph text-sm font-bold">{mentor.name}</p>
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
