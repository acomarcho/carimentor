import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import GroupSessionDetail from "@/components/group-sessions/detail";
import Head from "next/head";

import { useRouter } from "next/router";

export default function GroupSessionDetailPage() {
  const router = useRouter();
  const sessionId = router.query.id as string;

  return (
    <Wrapper>
      <Head>
        <title>Group Session Detail</title>
      </Head>
      <Navbar />
      <GroupSessionDetail sessionId={sessionId} />
    </Wrapper>
  );
}
