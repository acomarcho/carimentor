import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MyProfile from "@/components/profile";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <Wrapper>
      <Head>
        <title>My Profile</title>
      </Head>
      <Navbar />
      <MyProfile />
    </Wrapper>
  );
}
