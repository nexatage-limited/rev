import type { Metadata } from "next";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden relative">
          <Sidebar />
          <main className="flex-1 flex flex-col h-full overflow-hidden md:relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
