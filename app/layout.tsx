import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoDent - AI-powered Dental Assistant",
  description:
    "Enhance your dental practice with AI-driven voice assistance and documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
          >
            <UserSync />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </TanStackProvider>
  );
}
