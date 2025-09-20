'use client'; // This directive must be at the top of the file

import { SessionProvider } from 'next-auth/react';
import './globals.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}