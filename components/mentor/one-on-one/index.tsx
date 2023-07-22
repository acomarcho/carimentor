import DecorationVector from "../../common/decoration-vector";
import { Badge, Radio, TextInput } from "@mantine/core";
import { IconUserCircle, IconCalendar, IconBrowser } from "@tabler/icons-react";
import { getBadgeColor, formatDateToIndonesianLocale } from "@/lib/utils";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { labelStyle } from "@/lib/constants/styles";
import { ProcessOneOnOneRequest } from "@/lib/constants/requests";
import { useOneOnOne } from "@/lib/hooks/use-one-on-one";

export default function MenteeBookings() {
  // const bookings = dummyMenteeBookings;
  const { histories: bookings, isLoading, isError } = useOneOnOne();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<ProcessOneOnOneRequest>({
    approvalStatus: undefined,
    meetingUrl: "",
  });

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <h1 className="header-2rem underline">Permintaan One-on-One</h1>
      {bookings.length > 0 ? (
        <div className="flex flex-col gap-[1rem]">
          {bookings.map((booking) => {
            return (
              <div
                key={booking.id}
                className="bg-white p-[1rem] rounded-xl drop-shadow-xl flex flex-col gap-[0.5rem] items-start"
              >
                <Badge color={getBadgeColor(booking.approvalStatus)}>
                  {booking.approvalStatus}
                </Badge>
                <div className="flex flex-row items-center gap-[0.5rem]">
                  <IconUserCircle />
                  <p className="paragraph">{booking.menteeName}</p>
                </div>
                <div className="flex flex-row items-center gap-[0.5rem]">
                  <IconCalendar />
                  <p className="paragraph">
                    {formatDateToIndonesianLocale(booking.date)}
                  </p>
                </div>
                {booking.approvalStatus === "APPROVED" && (
                  <div className="flex flex-row items-center gap-[0.5rem]">
                    <IconBrowser />
                    <Link href={booking.meetingUrl || ""} className="paragraph">
                      {booking.meetingUrl}
                    </Link>
                  </div>
                )}
                {booking.approvalStatus === "PENDING" && (
                  <button
                    className="button-600-filled"
                    onClick={() => {
                      setIsModalOpen(true);
                      setRequest({ approvalStatus: undefined, meetingUrl: "" });
                    }}
                  >
                    Proses permintaan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="paragraph">
          Anda belum pernah menerima permintaan one-on-one.
        </p>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "rounded-xl" }}
      >
        <div className="flex flex-col justify-center gap-[1rem] p-[1rem] max-w-[293px]">
          <h1 className="subheader">Proses permintaan</h1>
          <p className="paragraph">
            Isi formulir di bawah ini untuk memproses permintaan!
          </p>
          <Radio.Group
            label="Status permintaan"
            withAsterisk
            styles={{ ...labelStyle }}
            className="flex flex-col items-start gap-[0.5rem]"
            value={request.approvalStatus}
            onChange={(v) => setRequest({ ...request, approvalStatus: v })}
          >
            <Radio value="APPROVE" label="Terima" styles={{ ...labelStyle }} />
            <Radio value="REJECT" label="Tolak" styles={{ ...labelStyle }} />
          </Radio.Group>
          <TextInput
            label="Tautan meet one-on-one"
            radius="lg"
            placeholder="https://meet.google.com/<id>"
            withAsterisk
            styles={{ ...labelStyle }}
            value={request.meetingUrl}
            onChange={(e) =>
              setRequest({ ...request, meetingUrl: e.currentTarget.value })
            }
            disabled={request.approvalStatus !== "APPROVE"}
          />
          <button
            className="button-600-filled"
            disabled={
              !request.approvalStatus ||
              (request.approvalStatus === "APPROVE" && !request.meetingUrl)
            }
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Proses permintaan
          </button>
        </div>
      </Modal>
    </div>
  );
}
