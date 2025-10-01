import type { Metadata } from "next";

import { AppProvider } from "@altha/core/components/app-provider";
import { openSans } from "@altha/core/lib/google-font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career | Altha Consulting",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Altha" />
      </head>
      <body className="antialiased font-sans">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
