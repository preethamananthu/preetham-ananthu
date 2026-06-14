import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Preetham",
    default: "Preetham | Premium Digital Architecture",
  },
  description: "Most business websites are forgettable. I build websites businesses remember.",
  keywords: ["Frontend Architect", "Next.js", "Creative Developer", "WebGL", "GSAP", "Brutalist Design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${ibmMono.variable} dark antialiased lenis lenis-smooth`}
    >
      <head>
        {/* Cabinet Grotesk from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400,900&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --font-cabinet: 'Cabinet Grotesk', sans-serif;
          }
        `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col selection:bg-[var(--color-acid)] selection:text-[var(--color-carbon)]">
        <LenisProvider>
          <Navigation />
          {children}
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
