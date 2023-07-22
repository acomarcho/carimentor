import DecorationVector from "../common/decoration-vector";
import { Badge, Textarea, LoadingOverlay } from "@mantine/core";
import { IconUserCircle, IconCalendar, IconBrowser } from "@tabler/icons-react";
import {
  getBadgeColor,
  formatDateToIndonesianLocale,
  showError,
  showSuccess,
} from "@/lib/utils";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { labelStyle } from "@/lib/constants/styles";
import ReactStars from "react-stars";
import { ReviewOneOnOneRequest } from "@/lib/constants/requests";
import { useOneOnOne } from "@/lib/hooks/use-one-on-one";
import { OneOnOne } from "@/lib/constants/responses";
import { postReview } from "@/lib/api/one-on-one";

export default function MyBookings() {
  const {
    histories: bookings,
    setHistories: setBookings,
    isLoading,
    isError,
  } = useOneOnOne();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [request, setRequest] = useState<ReviewOneOnOneRequest>({
    message: "",
    rating: 0,
  });
  const [selectedOneOnOne, setSelectedOneOnOne] = useState<OneOnOne>();
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  const loadingFlag = isLoading || isError || isReviewing;

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
      <h1 className="header-2rem underline">Riwayat One-on-One</h1>
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
                  <p className="paragraph">{booking.mentorName}</p>
                </div>
                <div className="flex flex-row items-center gap-[0.5rem]">
                  <IconCalendar />
                  <p className="paragraph">
                    {formatDateToIndonesianLocale(booking.date)}
                  </p>
                </div>
                {booking.approvalStatus === "APPROVED" && (
                  <>
                    <div className="flex flex-row items-center gap-[0.5rem]">
                      <IconBrowser />
                      <Link
                        href={booking.meetingUrl || ""}
                        className="paragraph"
                      >
                        {booking.meetingUrl}
                      </Link>
                    </div>
                    {!booking.review ? (
                      <button
                        className="button-600-filled"
                        onClick={() => {
                          setIsModalOpen(true);
                          setRequest({ message: "", rating: 0 });
                          setSelectedOneOnOne(booking);
                        }}
                      >
                        Berikan review
                      </button>
                    ) : (
                      <p className="paragraph">
                        Anda sudah memberikan review untuk sesi ini.
                      </p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="paragraph">
          Anda belum pernah mengirimkan permintaan one-on-one.
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
          <h1 className="subheader">Beri penilaian</h1>
          <p className="paragraph">
            Isi formulir di bawah ini untuk memberikan penilaian!
          </p>
          <Textarea
            label="Review untuk mentor"
            placeholder="Materinya sangat bermanfaat!"
            withAsterisk
            styles={{ ...labelStyle }}
            radius="lg"
            value={request.message}
            onChange={(e) =>
              setRequest({ ...request, message: e.currentTarget.value })
            }
            autosize
          />
          <div className="flex flex-col">
            <p className="paragraph font-semibold text-[0.8rem]">
              Penilaian <span className="text-red-500">*</span>
            </p>
            <ReactStars
              count={5}
              size={32}
              value={request.rating}
              onChange={(v) => setRequest({ ...request, rating: v })}
            />
          </div>
          <button
            className="button-600-filled"
            disabled={!request.message || !request.rating}
            onClick={() => {
              const handleClick = async () => {
                try {
                  setIsReviewing(true);
                  await postReview(
                    selectedOneOnOne!,
                    request.message,
                    request.rating,
                    localStorage.getItem("token")! || ""
                  );
                  setBookings(
                    bookings.map((booking) => {
                      if (booking.id !== selectedOneOnOne!.id) {
                        return booking;
                      } else {
                        return {
                          ...booking,
                          review: request.message,
                          rating: request.rating,
                        };
                      }
                    })
                  );
                  showSuccess("Berhasil memproses permintaan!");
                  setIsModalOpen(false);
                } catch (error) {
                  showError("Gagal memproses permintaan!");
                } finally {
                  setIsReviewing(false);
                }
              };

              handleClick();
            }}
          >
            Proses penilaian
          </button>
        </div>
      </Modal>
    </div>
  );
}
