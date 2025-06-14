import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poker Duel - Farcaster Mini App',
  description: 'Play 1v1 Texas Hold\'em poker on Farcaster',
  openGraph: {
    title: 'Poker Duel',
    description: 'Play 1v1 Texas Hold\'em poker on Farcaster',
    images: ['/og-image.svg'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:title': 'Poker Duel',
    'fc:frame:image': '/og-image.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}