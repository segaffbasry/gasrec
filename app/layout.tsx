import type { Metadata, Viewport } from "next";
import { Manrope, Poppins } from "next/font/google";
import { Shell } from "@/components/Shell";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The live site's own pair (Squarespace): Manrope 500 for headings, Poppins 400 for text, nav and buttons.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Gasrec",
  description: "Gasrec designs, builds and operates Bio-LNG and Bio-CNG refuelling stations and supplies renewable gas fuel to road-transport fleets.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#185381" };

/* `js` and the preloader's `is-loading` are set before first paint (unless reduced motion is requested), so reveal
   targets can start hidden without a flash. Without JavaScript nothing is hidden and the preloader never shows. */
const boot = "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js','is-loading')";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/media/hero-canopy.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body><Shell>{children}</Shell></body>
    </html>
  );
}
