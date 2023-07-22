import DecorationVector from "@/components/common/decoration-vector";

export default function GroupSessionDetail({
  sessionId,
}: {
  sessionId: string;
}) {
  return (
    <div className="default-wrapper">
      <DecorationVector />
      <p>{sessionId}</p>
    </div>
  );
}
