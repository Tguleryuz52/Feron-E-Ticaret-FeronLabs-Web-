import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GlobalMusicProvider from "@/components/GlobalMusicProvider";
import { Toaster } from "sonner";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Feron | Premium Lifestyle Clothing",
  description:
    "Explore Feron's premium lifestyle clothing catalog, featuring high-end casual wear for the modern individual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorantGaramond.variable} suppressHydrationWarning>
      <body className="antialiased font-sans bg-zinc-950 text-white" suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <GlobalMusicProvider />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
            },
          }}
        />
      </body>
    </html>
  );
}

