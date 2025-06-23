import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { ArtistProvider } from '@/app/context/ ArtistContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artistly - Performing Artist Booking Platform',
  description: 'Connect event planners with talented artists for unforgettable events.',
  keywords: ['artist booking', 'event planning', 'performers'],
  openGraph: {
    title: 'Artistly',
    description: 'Book top performing artists for your events.',
    url: 'https://artistly.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <ArtistProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ArtistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}