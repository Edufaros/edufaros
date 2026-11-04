import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = "https://edufaros-company-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Student Acquisition & Enrolment Growth for Education Businesses | EduFaros",
    template: "%s | EduFaros",
  },
  description:
    "EduFaros helps independent education businesses improve student acquisition, enquiry quality, follow-up and enrolment processes across the US and UK.",
  applicationName: "EduFaros",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "EduFaros",
    title: "Build a stronger path from student interest to enrolment.",
    description:
      "Student acquisition and enrolment growth for independent education businesses in the United States and United Kingdom.",
  },
  twitter: {
    card: "summary",
    title: "EduFaros — Student Acquisition & Enrolment Growth",
    description:
      "Build a stronger path from student interest to enrolment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071A2B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
