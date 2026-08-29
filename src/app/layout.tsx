import type { Metadata, Viewport } from "next";
import { MotionProvider } from "../components/MotionProvider";
import { ScrollProgress } from "../components/ScrollProgress";
import { buildOrganizationJsonLd, buildWebPageJsonLd, seoDescription, seoKeywords, seoTitle, SITE_URL } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoTitle,
    template: "%s | CIDUS",
  },
  description: seoDescription,
  keywords: seoKeywords,
  applicationName: "CIDUS",
  authors: [{ name: "CIDUS" }],
  creator: "CIDUS",
  publisher: "CIDUS",
  category: "Professional Services",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CIDUS",
    title: seoTitle,
    description: seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
  },
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
  const organizationJsonLd = buildOrganizationJsonLd();
  const webPageJsonLd = buildWebPageJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </head>
      <body>
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
