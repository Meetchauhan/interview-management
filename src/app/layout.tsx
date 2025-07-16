"use client";

// import "../globals.css";
import { Inter } from "next/font/google";

import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "MetizIQ",
  description: " AI-powered Interviews",
  openGraph: {
    title: "MetizIQ",
    description: "AI-powered Interviews",
    siteName: "MetizIQ",
    images: [
      {
        url: "/foloup.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/browser-client-icon.ico" />
      </head>
      <body
       
      >
        {children}
       
      </body>
    </html>
  );
} 
