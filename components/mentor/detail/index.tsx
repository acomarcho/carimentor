import DecorationVector from "../../common/decoration-vector";

export default function MentorDetail({ mentorId }: { mentorId: string }) {
  return (
    <div className="default-wrapper">
      <DecorationVector />
      <h1>Hello, {mentorId}!</h1>
    </div>
  );
}
