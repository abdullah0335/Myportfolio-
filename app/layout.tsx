import type { Metadata, Viewport } from "next";
import { Archivo, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import Nav from "@/components/Nav";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Origin only: image paths already carry the /Myportfolio- base path, and Next
  // appends them to metadataBase's path rather than resolving them.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: {
    default: "Muhammad Abdullah — Lead Web Developer",
    template: "%s — Muhammad Abdullah",
  },
  description:
    "Personal portfolio of Muhammad Abdullah, a lead web developer with 250+ production websites: WordPress, Shopify and full-stack builds for e-commerce, real estate, healthcare and media.",
  keywords: [
    "Muhammad Abdullah",
    "web developer",
    "portfolio",
    "Shopify developer",
    "WordPress developer",
    "e-commerce websites",
    "real estate websites",
  ],
  authors: [{ name: "Muhammad Abdullah" }],
  creator: "Muhammad Abdullah",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Abdullah — Web Developer",
    description: "Websites and online stores for brands in Pakistan, the UK, the UAE and Singapore.",
    siteName: "Muhammad Abdullah",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Abdullah — Web Developer",
    description: "Websites and online stores for brands in Pakistan, the UK, the UAE and Singapore.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-paper antialiased overflow-x-clip grain">
        <SiteShell>
          <Nav />
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
