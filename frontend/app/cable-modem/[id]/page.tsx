'use client';

import { trpc } from '@/lib/trpc-react';
import { CableModemDetail } from '@/components/cable-modem/detail/CableModemDetail';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function CableModemDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { data: cableModem, isLoading, error } = trpc.cableModem.byId.useQuery({ id: params.id });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="text-muted-foreground text-sm mt-4">Loading cable modem details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cableModem) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <p className="text-destructive text-lg">Cable Modem Not Found</p>
            <p className="text-muted-foreground text-sm mt-2">
              {error?.message || 'The cable modem you are looking for does not exist.'}
            </p>
            <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
              Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <CableModemDetail cableModem={cableModem} />;
}
