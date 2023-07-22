import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MyBookings from "@/components/one-on-one";
import Head from "next/head";

export default function MyBookingsPage() {
  return (
    <Wrapper>
      <Head>
        <title>My Bookings</title>
      </Head>
      <Navbar />
      <MyBookings />
    </Wrapper>
  );
}
