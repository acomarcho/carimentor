import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MentorGroupSessions from "@/components/mentor/group-session";
import Head from "next/head";

export default function GroupSessionsPage() {
  return (
    <Wrapper>
      <Head>
        <title>My Group Sessions</title>
      </Head>
      <Navbar />
      <MentorGroupSessions />
    </Wrapper>
  );
}
