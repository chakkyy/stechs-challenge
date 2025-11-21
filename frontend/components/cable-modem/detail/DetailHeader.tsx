'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteDialog } from './DeleteDialog';

interface DetailHeaderProps {
  cableModemId: string;
  cableModemName: string;
}

export function DetailHeader({ cableModemId, cableModemName }: DetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={() => router.push('/')}
        className="gap-2 pl-0 hover:pl-2 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to List
      </Button>

      <DeleteDialog cableModemId={cableModemId} cableModemName={cableModemName}>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DeleteDialog>
    </div>
  );
}
