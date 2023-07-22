import DecorationVector from "../../common/decoration-vector";
import {
  dummyMentorWithPicture,
  dummyMentorWithoutPicture,
} from "@/lib/dummies";
import {
  IconUserCircle,
  IconMapPin,
  IconVocabulary,
  IconSignature,
} from "@tabler/icons-react";
import Image from "next/image";

export default function BookMentor({ mentorId }: { mentorId: string }) {
  const mentor = dummyMentorWithPicture;

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
      <div className="flex flex-row gap-[1rem] items-center flex-shrink-0">
        {renderProfilePicture()}
        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[1rem]">
            <IconSignature />
            <div className="subheader max-w-[100px] md:max-w-[400px]">
              {mentor.name}
            </div>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconVocabulary />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {mentor.tags.slice(0, 2).join(", ")}
              {mentor.tags.length > 2 &&
                ` dan ${mentor.tags.length - 2} ketertarikan lainnya`}
            </p>
          </div>
          <div className="flex items-center gap-[1rem]">
            <IconMapPin />
            <p className="paragraph max-w-[100px] md:max-w-[400px]">
              {mentor.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
