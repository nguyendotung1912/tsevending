import type { Metadata } from "next";
import Script from "next/script";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";

// Body text — clean, highly readable, full Vietnamese support.
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

// Headings — bold geometric sans built for Vietnamese, echoes the logo's
// heavy "TS" wordmark.
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-bevn",
  display: "swap",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`h-full ${inter.variable} ${beVietnamPro.variable}`}>
      <head>
        {/* Article images are hotlinked from the Pexels CDN — warm the connection early. */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VR47QNZRT8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VR47QNZRT8');
          `}
        </Script>
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main className="flex-1 pb-14 md:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
