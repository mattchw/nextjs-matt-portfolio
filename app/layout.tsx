import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/code-highlight/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import {
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { Providers } from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS4_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://mattwong.info"),
  title: {
    default: "Matt Wong",
    template: "%s | Matt Wong",
  },
  description:
    "Software engineer based in the United Kingdom and Hong Kong. Frontend, backend, and product work.",
  openGraph: {
    title: "Matt Wong",
    description:
      "Software engineer based in the United Kingdom and Hong Kong.",
    url: "https://mattwong.info",
    siteName: "Matt Wong",
    type: "website",
    images: ["/logo192.png"],
  },
  twitter: {
    card: "summary",
    title: "Matt Wong",
    description:
      "Software engineer based in the United Kingdom and Hong Kong.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
