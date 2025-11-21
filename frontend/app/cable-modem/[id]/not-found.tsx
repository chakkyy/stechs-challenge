'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Cable Modem Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The cable modem you&apos;re looking for could not be found.
      </p>
      <Button asChild>
        <Link href="/" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
