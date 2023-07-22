import DecorationVector from "../common/decoration-vector";
import { dummyMyBookings } from "@/lib/dummies";
import { Badge } from "@mantine/core";
import { IconUserCircle, IconCalendar, IconBrowser } from "@tabler/icons-react";
import { getBadgeColor, formatDateToIndonesianLocale } from "@/lib/utils";
import Link from "next/link";

export default function MyBookings() {
  const bookings = dummyMyBookings;

  return (
    <div className="default-wrapper">
      <DecorationVector />
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
                      <Link href={booking.meetingUrl} className="paragraph">
                        {booking.meetingUrl}
                      </Link>
                    </div>
                    {!booking.review ? (
                      <button className="button-600-filled">
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
    </div>
  );
}
