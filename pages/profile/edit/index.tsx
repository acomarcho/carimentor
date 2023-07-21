import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import EditProfile from "@/components/profile/edit";
import Head from "next/head";

export default function EditProfilePage() {
  return (
    <Wrapper>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Navbar />
      <EditProfile />
    </Wrapper>
  );
}
