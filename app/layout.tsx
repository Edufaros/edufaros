import type { Metadata } from "next";
import { Caveat, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});


export const metadata: Metadata = {
  title: {
    default: "EduFaros | Education Growth Systems",
    template: "%s | EduFaros"
  },
  description:
    "EduFaros helps education businesses connect performance marketing, conversion systems, automation and growth strategy.",
  applicationName: "EduFaros",
  openGraph: {
    title: "EduFaros | Education Growth Systems",
    description:
      "A more connected approach to growth for education businesses.",
    type: "website",
    siteName: "EduFaros"
  },
  twitter: {
    card: "summary_large_image",
    title: "EduFaros | Education Growth Systems",
    description:
      "A more connected approach to growth for education businesses."
  },
  icons: {
    icon: "/icon.svg"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable + " " + inter.variable + " " + caveat.variable}>
        {children}
      </body>
    </html>
  );
}