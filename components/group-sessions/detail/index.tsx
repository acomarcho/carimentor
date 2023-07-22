import DecorationVector from "@/components/common/decoration-vector";
import { createBookGroupSession } from "@/lib/api";
import { apiURL } from "@/lib/constants";
import { Discussion, GetUserResponse, User } from "@/lib/constants/responses";
import { useGroupSession } from "@/lib/hooks/use-group-session";
import { useUser } from "@/lib/hooks/use-user";
import { formatDateToIndonesianLocale, showError } from "@/lib/utils";
import { LoadingOverlay, Textarea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconCalendar, IconUserCircle, IconUsers } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const fetchUser = (id: string) => {
  return axios.get<GetUserResponse>(`${apiURL}/user/${id}`);
};

export default function GroupSessionDetail({
  sessionId,
}: {
  sessionId: string;
}) {
  const { user, isLoading, isError } = useUser();
  const { groupSession, discussions, bookGroupSessions } =
    useGroupSession(sessionId);
  const session = groupSession?.data;
  const discussionsData = discussions?.data || [];
  const bookGroupSessionsData = bookGroupSessions?.data || [];

  const [createBookLoading, setCreateBookLoading] = useState(false);

  const loadingFlag = isLoading || isError || createBookLoading;

  const [discussionWithSender, setDiscussionWithSender] = useState<
    (Discussion & {
      sender: User;
    })[]
  >([]);

  const [mentor, setMentor] = useState<User | null>(null);
  useEffect(() => {
    if (groupSession && groupSession.data) {
      fetchUser(groupSession.data.mentorId).then((res) => {
        setMentor(res.data.data);
      });
    }
  }, [groupSession]);

  useEffect(() => {
    if (discussions) {
      const fetchSender = discussions.data.map(async (d) => {
        const sender = await fetchUser(d.userId);
        return {
          ...d,
          sender: sender.data.data,
        };
      });
      Promise.all(fetchSender).then((res) => {
        setDiscussionWithSender(res);
      });
    }
  }, [discussions]);

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const { height, width } = useViewportSize();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
  }, [height, width]);

  const renderFooter = () => {
    return (
      <div
        className="bg-white drop-shadow-xl fixed bottom-0 left-0 w-full"
        ref={footerRef}
      >
        <div className="max-w-[1160px] mx-auto p-[1.25rem]">
          {isAuthenticated ? (
            <div>
              {user?.role === "MENTEE" ? (
                <div className="flex flex-col gap-[0.5rem]">
                  <p className="paragraph text-center">
                    Segera bergabung!{" "}
                    {session &&
                      session.maxParticipant -
                        bookGroupSessionsData.length +
                        " slot tersedia"}
                  </p>
                  <button
                    className="button-600-filled block"
                    onClick={async () => {
                      try {
                        setCreateBookLoading(true);
                        const resp = await createBookGroupSession({
                          sessionId,
                        });
                        setIsModalOpen(true);
                      } catch (e) {
                        console.error(e);
                        showError("Gagal bergabung ke sesi grup");
                      } finally {
                        setCreateBookLoading(false);
                      }
                    }}
                  >
                    Gabung sesi
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-[0.5rem]">
              <p className="paragraph text-center">
                Masuk ke dalam akunmu untuk mengikuti sesi grup!
              </p>
              <Link href="/login" className="button-600-filled block">
                Masuk
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <div className="flex flex-col gap-[0.5rem]">
        <h2 className="subheader">{session?.name}</h2>
        <div className="flex gap-[1rem] items-center">
          <IconUserCircle />
          <p className="paragraph font-bold">{mentor?.name}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl drop-shadow-xl p-[1rem] mt-[2rem]">
        <h2 className="paragraph font-bold">Deskripsi</h2>
        <p className="paragraph">{session?.description}</p>
        <div className="flex gap-[0.5rem] items-center mt-[1rem]">
          <IconCalendar />
          <p className="paragraph text-sm">
            {formatDateToIndonesianLocale(
              session?.date || new Date().toISOString()
            )}
          </p>
        </div>
        <div className="flex gap-[0.5rem] items-center mt-[1rem]">
          <IconUsers />
          <p className="paragraph text-sm">
            {session?.maxParticipant || 0} slot
          </p>
        </div>
        <h2 className="paragraph font-bold mt-[2rem]">Tentang mentor</h2>
        <p className="paragraph">{mentor?.description}</p>
        <h2 className="paragraph font-bold mt-[2rem]">Diskusi</h2>
        {discussionsData.length === 0 && (
          <p className="paragraph">
            Sesi grup ini belum memiliki diskusi. Jadilah orang pertama yang
            memulainya!
          </p>
        )}
        {discussionWithSender.length > 0 &&
          discussionWithSender.map((d) => {
            return (
              <div key={d.id} className="mt-[1rem]">
                <div className="flex justify-between">
                  <p className="paragraph font-bold text-sm">{d.sender.name}</p>
                  <p className="paragraph text-sm">
                    {formatDateToIndonesianLocale(d.createdAt)}
                  </p>
                </div>
                <p className="paragraph">{d.content}</p>
              </div>
            );
          })}
      </div>
      <div style={{ marginTop: footerHeight }} />
      {renderFooter()}
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
          <h1 className="subheader text-center">Kamu Berhasil Bergabung</h1>
          <Image
            src="/images/modal-success.png"
            alt="Success checkmark"
            width={180}
            height={132.33}
          />
          <p className="paragraph text-center">
            Periksa laman sesi grup untuk tautan sesi dan akses diskusi. Jangan
            lupa hadir tepat waktu!
          </p>
          <Link href="/group-session/self" className="button-600-filled w-full">
            Lihat laman sesi grup
          </Link>
        </div>
      </Modal>
    </div>
  );
}
