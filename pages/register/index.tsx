import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import Register from "@/components/register";
import Head from "next/head";

export default function HomePage() {
  return (
    <Wrapper>
      <Head>
        <title>Register</title>
      </Head>
      <Navbar />
      <Register />
    </Wrapper>
  );
}
