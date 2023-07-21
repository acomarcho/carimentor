import Image from "next/image";

export default function DecorationVector() {
  return (
    <>
      <Image
        src="/images/decoration-1.svg"
        width={62}
        height={62}
        alt=""
        className="absolute top-[-20px] right-[97px] z-[-5]"
      />
      <Image
        src="/images/decoration-2.svg"
        width={110}
        height={110}
        alt=""
        className="absolute top-[45px] left-[-20px] z-[-5]"
      />
      <Image
        src="/images/decoration-3.svg"
        width={66}
        height={66}
        alt=""
        className="absolute top-[189px] right-0 z-[-5]"
      />
      <Image
        src="/images/decoration-4.svg"
        width={62}
        height={62}
        alt=""
        className="absolute bottom-[207px] left-[81px] z-[-5]"
      />
      <Image
        src="/images/decoration-5.svg"
        width={116}
        height={58}
        alt=""
        className="absolute bottom-[97px] right-0 z-[-5]"
      />
      <Image
        src="/images/decoration-6.svg"
        width={62}
        height={62}
        alt=""
        className="absolute bottom-0 left-0 z-[-5]"
      />
    </>
  );
}
