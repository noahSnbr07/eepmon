import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotificationRootWrapper from "../utils/components/notification-root-wrapper";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eepmon",
  description: "Log your sleep pattern",
  creator: "Eule",
  generator: "Next.js",
  keywords: ["logging", "lifestyle", "health"],
  robots: {
    follow: true,
    index: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics mode="auto" />
        <NotificationRootWrapper>
          {children}
        </NotificationRootWrapper>
      </body>
    </html>
  );
}
