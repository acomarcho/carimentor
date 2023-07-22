import DecorationVector from "@/components/common/decoration-vector";
import { dummyGroupSession, dummyGroupDiscussions } from "@/lib/dummies";
import { IconUserCircle, IconCalendar, IconUsers } from "@tabler/icons-react";
import { Textarea } from "@mantine/core";
import { formatDateToIndonesianLocale } from "@/lib/utils";

export default function GroupSessionDetail({
  sessionId,
}: {
  sessionId: string;
}) {
  const session = dummyGroupSession;
  const discussions = dummyGroupDiscussions;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <div className="flex flex-col gap-[0.5rem]">
        <h2 className="subheader">{session.name}</h2>
        <div className="flex gap-[1rem] items-center">
          <IconUserCircle />
          <p className="paragraph font-bold">{session.mentorName}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl drop-shadow-xl p-[1rem] mt-[2rem]">
        <h2 className="paragraph font-bold">Deskripsi</h2>
        <Textarea value={session.description} disabled className="mt-[1rem]" />
        <div className="flex gap-[0.5rem] items-center mt-[1rem]">
          <IconCalendar />
          <p className="paragraph text-sm">
            {formatDateToIndonesianLocale(session.date)}
          </p>
        </div>
        <div className="flex gap-[0.5rem] items-center mt-[1rem]">
          <IconUsers />
          <p className="paragraph text-sm">{session.maxParticipant} slot</p>
        </div>
        <h2 className="paragraph font-bold mt-[2rem]">Tentang mentor</h2>
        <Textarea
          value={session.mentorDescription}
          disabled
          className="mt-[1rem]"
        />
        <h2 className="paragraph font-bold mt-[2rem]">Diskusi</h2>
        {discussions.length === 0 && (
          <p className="paragraph">
            Sesi grup ini belum memiliki diskusi. Jadilah orang pertama yang
            memulainya!
          </p>
        )}
        {discussions.length > 0 &&
          discussions.map((d) => {
            return (
              <div key={d.id} className="mt-[1rem]">
                <div className="flex justify-between">
                  <p className="paragraph font-bold text-sm">{d.userName}</p>
                  <p className="paragraph text-sm">
                    {formatDateToIndonesianLocale(d.createdAt)}
                  </p>
                </div>
                <Textarea value={d.content} className="mt-[0.5rem]" disabled />
              </div>
            );
          })}
      </div>
    </div>
  );
}
