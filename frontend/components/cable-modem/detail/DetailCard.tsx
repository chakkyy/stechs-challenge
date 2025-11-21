import { CableModem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '../StatusBadge';
import { DetailFields } from './DetailFields';

interface DetailCardProps {
  cableModem: CableModem;
}

export function DetailCard({ cableModem }: DetailCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                {cableModem.name}
              </CardTitle>
              <StatusBadge status={cableModem.status} />
            </div>
            <CardDescription className="text-base mt-2">
              ID:{' '}
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {cableModem.id}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        <DetailFields
          description={cableModem.description}
          validSince={cableModem.validSince}
          createdAt={cableModem.createdAt}
          updatedAt={cableModem.updatedAt}
          tags={cableModem.tags}
        />
      </CardContent>
    </Card>
  );
}
