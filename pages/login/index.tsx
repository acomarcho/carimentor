import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import Login from "@/components/login";
import Head from "next/head";

export default function LoginPage() {
  return (
    <Wrapper>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <Login />
    </Wrapper>
  );
}
