import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ProcureOS Buyer Portal | Autonomous Procurement Platform",
  description: "Next-generation buyer portal powered by AIP-103+ Autonomous Procurement Engine. Find suppliers, manage RFQs, and automate your supply chain with AI intelligence.",
  keywords: ["procurement", "supply chain", "autonomous", "RFQ", "global logistics", "AIP-103", "B2B buyer portal"],
  openGraph: {
    title: "ProcureOS Buyer Portal",
    description: "Global Autonomous Procurement Protocol",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

import { AutoLogout } from "@/components/auth/AutoLogout";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AutoLogout />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
