import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CableModemFiltersProvider } from '@/contexts/CableModemFiltersContext';

export const metadata: Metadata = {
  title: 'Stechs Challenge',
  description: 'Cable Modem Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground">
        <CableModemFiltersProvider>
          {children}
          <Toaster />
        </CableModemFiltersProvider>
      </body>
    </html>
  );
}
