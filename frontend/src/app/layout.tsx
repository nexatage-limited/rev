import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rev Admin - Platform Management",
  description: "Trust-first phone repair platform administration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
