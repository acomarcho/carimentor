import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import GroupSessions from "@/components/group-sessions";
import Head from "next/head";

export default function GroupSessionsPage() {
  return (
    <Wrapper>
      <Head>
        <title>Group Sessions</title>
      </Head>
      <Navbar />
      <GroupSessions />
    </Wrapper>
  );
}
