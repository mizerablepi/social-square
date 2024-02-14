import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/MobileHeader";
import MobileNavbar from "@/components/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialSquare",
  description: "Everything corner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileHeader profilePic={undefined} />
        {children}
        <MobileNavbar />
      </body>
    </html>
  );
}
