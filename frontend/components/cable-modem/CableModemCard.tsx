import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/cable-modem/StatusBadge';
import { CableModem } from '@/lib/types';

interface CableModemCardProps {
  cableModem: CableModem;
}

export function CableModemCard({ cableModem }: CableModemCardProps) {
  const formattedDate = cableModem.validSince
    ? new Date(cableModem.validSince).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <Link href={`/cable-modem/${cableModem.id}`}>
      <Card className="p-6 hover:border-primary/50 transition-colors cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight">{cableModem.name}</h3>
          <StatusBadge status={cableModem.status} />
        </div>

        <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
          {cableModem.description || 'No description available'}
        </p>

        {cableModem.tags && cableModem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cableModem.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {cableModem.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{cableModem.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">Valid since {formattedDate}</div>
      </Card>
    </Link>
  );
}
