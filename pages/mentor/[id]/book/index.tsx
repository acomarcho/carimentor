import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import BookMentor from "@/components/mentor/book";
import Head from "next/head";

import { useRouter } from "next/router";

export default function BookMentorPage() {
  const router = useRouter();
  const mentorId = router.query.id as string;

  return (
    <Wrapper>
      <Head>
        <title>Book Mentor</title>
      </Head>
      <Navbar />
      <BookMentor mentorId={mentorId} />
    </Wrapper>
  );
}
