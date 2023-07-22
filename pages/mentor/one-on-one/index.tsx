import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import MenteeBookings from "@/components/mentor/one-on-one";
import Head from "next/head";

export default function MyBookingsPage() {
  return (
    <Wrapper>
      <Head>
        <title>Mentee Bookings</title>
      </Head>
      <Navbar />
      <MenteeBookings />
    </Wrapper>
  );
}
