import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
