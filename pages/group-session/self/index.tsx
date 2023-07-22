import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MyGroupSessions from "@/components/group-sessions/self";
import Head from "next/head";

export default function GroupSessionsPage() {
  return (
    <Wrapper>
      <Head>
        <title>My Group Sessions</title>
      </Head>
      <Navbar />
      <MyGroupSessions />
    </Wrapper>
  );
}
