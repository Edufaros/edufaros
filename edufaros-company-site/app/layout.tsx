import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduFaros — New Website Workspace",
  description: "A new digital experience for EduFaros is taking shape.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
