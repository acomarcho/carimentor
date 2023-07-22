import DecorationVector from "../common/decoration-vector";
import { appName } from "@/lib/constants";
import Link from "next/link";

export default function GroupSessions() {
  return (
    <div className="default-wrapper flex flex-col gap-[1rem] items-center justify-center">
      <DecorationVector />
      <h1 className="header-2rem text-center">Sesi grup/workshop</h1>
      <p className="paragraph text-center">
        Tambah pengetahuanmu dengan mengikuti sesi grup/workshop yang dibuat
        oleh mentor-mentor {appName}!
      </p>
      <Link href="/" className="paragraph">
        <span className="text-purple-600">Ingin mencari mentor?</span>
      </Link>
    </div>
  );
}
