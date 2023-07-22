import DecorationVector from "../../common/decoration-vector";
import {
  IconUserCircle,
  IconVocabulary,
  IconMapPin,
  IconSignature,
} from "@tabler/icons-react";
import Image from "next/image";
import ReactStars from "react-stars";
import { Textarea } from "@mantine/core";
import { formatDateToIndonesianLocale } from "@/lib/utils";
import { useViewportSize } from "@mantine/hooks";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useMentor, useUser } from "@/lib/hooks/use-user";
import { useAllCities } from "@/lib/hooks/use-city";

export default function MentorDetail({ mentorId }: { mentorId: string }) {
  const { user, isLoading } = useUser();
  const {
    user: mentor,
    userTags: mentorTags,
    oneOnOnes,
    isLoading: isMentorLoading,
    isError: isMentorError,
  } = useMentor(mentorId);
  const { cities, isLoading: isCityLoading } = useAllCities();

  const reviews = oneOnOnes ? oneOnOnes.filter((d) => d.rating !== null) : [];
  const ratings =
    reviews.length > 0 ? reviews.map((review) => review.rating || 5) : [];
  const isAuthenticated = true;

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const { height, width } = useViewportSize();

  useEffect(() => {
    setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
  }, [height, width]);

  const renderProfilePicture = () => {
    if (!mentor || !mentor.imageUrl) {
      return <IconUserCircle size={64} />;
    } else {
      return (
        <div className="w-[4rem] h-[4rem] relative rounded-full overflow-hidden">
          <Image
            alt={mentor.name}
            src={mentor.imageUrl}
            fill
            className="object-cover"
          />
        </div>
      );
    }
  };

  const renderFooter = () => {
    return (
      <div
        className="bg-white drop-shadow-xl fixed bottom-0 left-0 w-full"
        ref={footerRef}
      >
        <div className="max-w-[1160px] mx-auto p-[1.25rem]">
          {isAuthenticated ? (
            <div className="flex flex-col gap-[0.5rem]">
              <p className="paragraph text-center">
                Ajukan sesi bersama mentor dan diskusi sebebasmu!
              </p>
              <Link
                href={`/mentor/${mentorId}/book`}
                className="button-600-filled block"
              >
                Jadwalkan 1-on-1
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-[0.5rem]">
              <p className="paragraph text-center">
                Masuk ke dalam akunmu untuk berdiskusi dengan mentor!
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
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[1rem] items-center flex-shrink-0">
          {renderProfilePicture()}
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex items-center gap-[1rem]">
              <IconSignature />
              <div className="subheader max-w-[100px] md:max-w-[400px]">
                {mentor?.name}
              </div>
            </div>
            <div className="flex items-center gap-[1rem]">
              <IconVocabulary />
              <p className="paragraph max-w-[100px] md:max-w-[400px]">
                {mentorTags &&
                  mentorTags
                    .map((tag) => tag.name)
                    .slice(0, 2)
                    .join(", ")}
                {mentorTags &&
                  mentorTags.length > 2 &&
                  ` dan ${mentorTags.length - 2} ketertarikan lainnya`}
              </p>
            </div>
            <div className="flex items-center gap-[1rem]">
              <IconMapPin />
              <p className="paragraph max-w-[100px] md:max-w-[400px]">
                {cities &&
                  cities.data &&
                  mentor &&
                  cities.data.find((city) => city.id === mentor.cityId)!.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] justify-center items-end">
          <ReactStars
            count={1}
            value={1}
            edit={false}
            size={32}
            className="drop-shadow-lg"
          />
          <p className="paragraph">
            {`${
              ratings.length === 0
                ? Math.round(0).toFixed(1)
                : (
                    ratings.reduce((prev, curr) => prev + curr) / ratings.length
                  ).toFixed(1)
            }/5.0`}
          </p>
          {mentor?.subscriptionStatus === "FREE" ? (
            <p className="paragraph text-end">Mentor reguler</p>
          ) : (
            <p className="paragraph font-bold text-end">Mentor premium</p>
          )}
        </div>
      </div>
      <div className="rounded-xl p-[1rem] bg-white drop-shadow-lg mt-[2rem]">
        <h2 className="subheader">Tentang mentor</h2>
        <Textarea disabled value={mentor?.description} autosize />
        <h2 className="subheader mt-[1rem]">Ulasan</h2>
        {reviews.length > 0 ? (
          reviews.map((data) => {
            return (
              <div className="flex flex-col gap-[1rem] mt-[1rem]" key={data.id}>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[0.25rem] max-w-[60%]">
                    <h2 className="header-600">{data.menteeName}</h2>
                    <ReactStars
                      count={5}
                      value={data.rating || 5}
                      size={20}
                      edit={false}
                    />
                    <p className="paragraph">{data.review}</p>
                  </div>
                  <p className="paragraph text-[0.75rem]">
                    {formatDateToIndonesianLocale(data.updatedAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="paragraph">Mentor ini belum memiliki ulasan.</p>
        )}
      </div>
      <div style={{ marginTop: footerHeight }} />
      {renderFooter()}
    </div>
  );
}
