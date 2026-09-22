import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Quran Jar",
  description: "Find peace and guidance through Quranic verses based on your emotions.",
icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative font-sans">
        <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700/20 via-slate-900/10 to-transparent z-0" />
        {children}
      </body>
    </html>
  );
}
