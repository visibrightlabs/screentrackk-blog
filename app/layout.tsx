import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ScreenTrackk Blog - Digital Wellness & Productivity Insights",
    template: "%s | ScreenTrackk Blog"
  },
  description: "Expert insights on digital wellness, screen time management, and productivity optimization. Learn how to build healthier digital habits with ScreenTrackk.",
  keywords: ["digital wellness", "screen time tracking", "productivity", "digital detox", "time management", "focus", "remote work"],
  authors: [{ name: "ScreenTrackk Team" }],
  openGraph: {
    title: "ScreenTrackk Blog - Digital Wellness & Productivity Insights",
    description: "Expert insights on digital wellness, screen time management, and productivity optimization.",
    url: "https://screentrackk.com/blog/",
    siteName: "ScreenTrackk",
    type: "website",
    images: [
      {
        url: "https://screentrackk.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScreenTrackk Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScreenTrackk Blog - Digital Wellness & Productivity Insights",
    description: "Expert insights on digital wellness, screen time management, and productivity optimization.",
    images: ["https://screentrackk.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://screentrackk.com/blog/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
