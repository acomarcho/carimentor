import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import Home from "@/components/home";
import Head from "next/head";

import { appName } from "@/lib/constants";

export default function HomePage() {
  return (
    <Wrapper>
      <Head>
        <title>{appName}</title>
      </Head>
      <Navbar />
      <Home />
    </Wrapper>
  );
}
