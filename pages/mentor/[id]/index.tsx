import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MentorDetail from "@/components/mentor/detail";
import Head from "next/head";

import { useRouter } from "next/router";

export default function MentorDetailPage() {
  const router = useRouter();
  const mentorId = router.query.id as string;

  return (
    <Wrapper>
      <Head>
        <title>Mentor Detail</title>
      </Head>
      <Navbar />
      <MentorDetail mentorId={mentorId} />
    </Wrapper>
  );
}
