'use client';

import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <html lang="id">
      <head>
        {/* favicon/tab icon */}
        <link rel="icon" href="images/logo-jambuku.png" />

        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={isAdmin ? 'bg-slate-50' : ''}>
        {!isAdmin && <Navbar />}
        <div className={isAdmin ? 'min-h-screen' : ''}>
          {children}
        </div>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
