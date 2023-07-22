import DecorationVector from "@/components/common/decoration-vector";
import Navbar from "@/components/common/nav";
import Wrapper from "@/components/common/wrapper";
import { appName } from "@/lib/constants";
import Head from "next/head";
import Image from "next/image";

export default function AboutUsPage() {
    return (
        <Wrapper>
            <Head>
                <title>{appName}</title>
            </Head>
            <Navbar />
            <div className="default-wrapper">
                <DecorationVector />
                <h1 className="header-2rem mb-[1rem] text-center">Siapa Kami?</h1>
                <p className="paragraph text-center"><span className="font-bold">CariMentor</span> adalah suatu platform penghubung mentor dan mentee untuk pertumbuhan dan kolaborasi yang inspiratif. Kami memiliki cita-cita untuk membangun masa depan yang lebih cerah bersama CariMentor!</p>
                <div className="flex flex-row justify-center gap-[3rem] my-[2rem]">
                    <div className="flex flex-col w-[5rem]">
                        <Image
                            src="/images/icon-inspiratif.svg"
                            width={62}
                            height={62}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">inspiratif</p>
                    </div>
                    <div className="flex flex-col w-[5rem]">
                        <Image
                            src="/images/icon-kolaboratif.svg"
                            width={62}
                            height={62}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">kolaboratif</p>
                    </div>
                    <div className="flex flex-col w-[5rem]">
                        <Image
                            src="/images/icon-pertumbuhan.svg"
                            width={62}
                            height={62}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">pertumbuhan</p>
                    </div>
                </div>
                <h1 className="header-2rem mt-[5rem] text-center">Tim Serpens</h1>
                <div className="grid grid-cols-2 my-[2rem] gap-[3rem] w-[20rem] m-auto">
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/profile-mabar.svg"
                            width={120}
                            height={120}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">Malik Akbar</p>
                        <p className="paragraph text-sm text-center">Backend Developer</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/profile-khelli.svg"
                            width={120}
                            height={120}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">Maria Khelli</p>
                        <p className="paragraph text-sm text-center">Backend Developer</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/profile-marcho.svg"
                            width={120}
                            height={120}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">Marchotridyo</p>
                        <p className="paragraph text-sm text-center">Frontend Developer</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="/images/profile-fay.svg"
                            width={120}
                            height={120}
                            alt=""
                            className="self-center"
                        />
                        <p className="paragraph font-bold self-center mt-[0.5rem]">Fayza Nadia</p>
                        <p className="paragraph text-sm text-center">UI/UX Designer</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}