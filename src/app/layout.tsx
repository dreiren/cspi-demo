import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIDUS — Integrated Solutions. Trusted Service. Reliable Results.",
  description:
    "CIDUS provides integrated solutions and professional services across technology, infrastructure, operations, logistics, engineering, and procurement.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2d54",
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
