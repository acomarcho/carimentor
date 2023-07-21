import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
      <h1 className="text-purple-600 text-xl font-outfit">Hello world!</h1>
    </Wrapper>
  );
}
