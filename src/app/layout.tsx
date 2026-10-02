import type { Metadata, Viewport } from "next";
import { MaintenancePage } from "../components/MaintenancePage";
import { isMaintenanceMode } from "../lib/maintenance";
import "./globals.css";

const liveMetadata: Metadata = {
  title: "CIDUS — Integrated Solutions. Trusted Service. Reliable Results.",
  description:
    "CIDUS provides integrated solutions and professional services across technology, infrastructure, operations, logistics, engineering, and procurement.",
  icons: {
    icon: "/favicon.svg",
  },
};

const maintenanceMetadata: Metadata = {
  title: "CIDUS — Site under maintenance",
  description: "CIDUS is updating the website. We will be back shortly.",
  icons: {
    icon: "/favicon.svg",
  },
};

export function generateMetadata(): Metadata {
  return isMaintenanceMode() ? maintenanceMetadata : liveMetadata;
}

export const viewport: Viewport = {
  themeColor: "#0c2d54",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const maintenanceOn = isMaintenanceMode();

  return (
    <html lang="en" className={maintenanceOn ? "maintenance-active" : undefined}>
      <body>{maintenanceOn ? <MaintenancePage /> : children}</body>
    </html>
  );
}
