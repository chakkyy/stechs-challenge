'use client';

import { CableModem } from '@/lib/types';
import { DetailHeader } from './DetailHeader';
import { DetailCard } from './DetailCard';

interface CableModemDetailProps {
  cableModem: CableModem;
}

export function CableModemDetail({ cableModem }: CableModemDetailProps) {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <DetailHeader cableModemId={cableModem.id} cableModemName={cableModem.name} />
      <DetailCard cableModem={cableModem} />
    </div>
  );
}
