import { approveOneOnOne, rejectOneOnOne } from "@/lib/api/one-on-one";
import { ProcessOneOnOneRequest } from "@/lib/constants/requests";
import { OneOnOne } from "@/lib/constants/responses";
import { labelStyle } from "@/lib/constants/styles";
import { useOneOnOne } from "@/lib/hooks/use-one-on-one";
import {
  formatDateToIndonesianLocale,
  getBadgeColor,
  showError,
  showSuccess,
} from "@/lib/utils";
import { Badge, Radio, TextInput, LoadingOverlay } from "@mantine/core";
import { IconBrowser, IconCalendar, IconUserCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DecorationVector from "../../common/decoration-vector";

export default function MenteeBookings() {
  const {
    histories: bookings,
    setHistories: setBookings,
    isLoading,
    isError,
  } = useOneOnOne();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedOneOnOne, setSelectedOneOnOne] = useState<OneOnOne>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<ProcessOneOnOneRequest>({
    approvalStatus: undefined,
    meetingUrl: "",
  });

  const loadingFlag = isLoading || isError || isProcessing;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
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
                      setSelectedOneOnOne(booking);
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
              const handleProcess = async () => {
                try {
                  setIsProcessing(true);
                  if (request.approvalStatus === "APPROVE") {
                    await approveOneOnOne(
                      selectedOneOnOne!,
                      request.meetingUrl,
                      localStorage.getItem("token") || ""
                    );
                    setBookings(
                      bookings.map((booking) => {
                        if (booking.id != selectedOneOnOne!.id) {
                          return booking;
                        } else {
                          return {
                            ...booking,
                            meetingUrl: request.meetingUrl,
                            approvalStatus: "APPROVED",
                          };
                        }
                      })
                    );
                  } else {
                    await rejectOneOnOne(
                      selectedOneOnOne!,
                      localStorage.getItem("token") || ""
                    );
                    setBookings(
                      bookings.map((booking) => {
                        if (booking.id != selectedOneOnOne!.id) {
                          return booking;
                        } else {
                          return {
                            ...booking,
                            approvalStatus: "REJECTED",
                          };
                        }
                      })
                    );
                  }
                  showSuccess("Berhasil memproses permintaan!");
                  setIsModalOpen(false);
                } catch (error) {
                  showError("Gagal memproses permintaan!");
                } finally {
                  setIsProcessing(false);
                }
              };

              handleProcess();
            }}
          >
            Proses permintaan
          </button>
        </div>
      </Modal>
    </div>
  );
}
