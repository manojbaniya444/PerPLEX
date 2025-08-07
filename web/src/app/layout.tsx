import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perplexica AI - Advanced Research Assistant",
  description:
    "Premium AI assistant with real-time web search and intelligent research capabilities",
  keywords: ["AI", "assistant", "research", "web search", "chat", "perplexica"],
  authors: [{ name: "Perplexica Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f59e0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-inter antialiased bg-gradient-to-br from-gray-50 to-amber-50/20">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
