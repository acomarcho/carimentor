import DecorationVector from "../../common/decoration-vector";
import {
  dummyMentorWithPicture,
  dummyMentorWithoutPicture,
  dummyReviews,
} from "@/lib/dummies";
import {
  IconUserCircle,
  IconVocabulary,
  IconMapPin,
} from "@tabler/icons-react";
import Image from "next/image";
import ReactStars from "react-stars";
import { Textarea } from "@mantine/core";

export default function MentorDetail({ mentorId }: { mentorId: string }) {
  const mentor = dummyMentorWithPicture;
  const reviews = dummyReviews;
  const ratings = reviews.map((review) => review.rating);

  const renderProfilePicture = () => {
    if (!mentor.imageUrl) {
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

  return (
    <div className="default-wrapper">
      <DecorationVector />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[1rem] items-center">
          {renderProfilePicture()}
          <div className="flex flex-col gap-[0.5rem]">
            <div className="subheader">{mentor.name}</div>
            <div className="flex items-center gap-[1rem]">
              <IconVocabulary />
              <p className="paragraph max-w-[200px] md:max-w-[400px]">
                {mentor.tags.slice(0, 2).join(", ")}
                {mentor.tags.length > 2 &&
                  ` dan ${mentor.tags.length - 2} ketertarikan lainnya`}
              </p>
            </div>
            <div className="flex items-center gap-[1rem]">
              <IconMapPin />
              <p className="paragraph max-w-[200px] md:max-w-[400px]">
                {mentor.city}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] justify-center items-center">
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
          {mentor.subscriptionStatus === "FREE" ? (
            <p className="paragraph">Mentor reguler</p>
          ) : (
            <p className="paragraph font-bold">Mentor premium</p>
          )}
        </div>
      </div>
      <div className="rounded-xl p-[1rem] bg-white drop-shadow-lg mt-[2rem]">
        <h2 className="subheader">Tentang mentor</h2>
        <Textarea disabled value={mentor.description} />
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
                      value={data.rating}
                      size={20}
                      edit={false}
                    />
                    <p className="paragraph">{data.review}</p>
                  </div>
                  <p className="paragraph text-[0.75rem]">{data.updatedAt}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="paragraph">Mentor ini belum memiliki ulasan.</p>
        )}
      </div>
    </div>
  );
}
