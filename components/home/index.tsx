import DecorationVector from "../common/decoration-vector";

export default function Home() {
  return (
    <div
      className="default-wrapper flex flex-col gap-[1rem] items-center justify-center"
    >
      <DecorationVector />
      <h1 className="header-2rem">Ingin belajar apa?</h1>
      <p className="paragraph">
        Cari mentor yang sesuai dengan kebutuhanmu!
      </p>
    </div>
  );
}
