import { Badge } from '@/components/ui/badge';
import { CableModemStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: CableModemStatus;
  className?: string;
}

const statusVariantMap: Record<CableModemStatus, 'active' | 'suspended' | 'provision'> = {
  Active: 'active',
  Suspended: 'suspended',
  Provision: 'provision',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariantMap[status]} className={className}>
      {status}
    </Badge>
  );
}
