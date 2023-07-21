import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

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
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <main className={`${outfit.variable} ${plusJakartaSans.variable}`}>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </>
  );
}
