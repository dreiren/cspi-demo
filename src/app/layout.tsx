import type { Metadata, Viewport } from "next";
import { MotionProvider } from "../components/MotionProvider";
import { ScrollProgress } from "../components/ScrollProgress";
import { siteMeta } from "../data/content";
import {
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
  seoDescription,
  seoKeywords,
  seoTitle,
  serializeJsonLd,
  SITE_URL,
} from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoTitle,
    template: `%s | ${siteMeta.shortName}`,
  },
  description: seoDescription,
  keywords: seoKeywords,
  applicationName: siteMeta.legalName,
  authors: [{ name: siteMeta.legalName }],
  creator: siteMeta.legalName,
  publisher: siteMeta.legalName,
  category: "Information Technology",
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
    siteName: siteMeta.legalName,
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
  colorScheme: "dark",
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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageJsonLd) }}
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
