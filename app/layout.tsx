import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RobloxGuard - Stop Roblox Scams Before They Happen',
  description: 'Protect your child\'s Roblox account from fraud with real-time monitoring and instant alerts. Block suspicious transactions before they happen.',
  verification: {
    google: '0O86oBiQ5gnKWqCTxq2wa8kkeByLwtXaBmTmB96oLgU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

