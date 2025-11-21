import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
// Removed: import { CableModem } from '@/lib/types';

interface DetailFieldsProps {
  description: string | null;
  validSince: string | null | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  tags: string[];
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'PPP');
  } catch (e) {
    return dateString;
  }
}

interface FieldItemProps {
  label: string;
  value: string | null | undefined;
  fallback?: string;
}

function FieldItem({ label, value, fallback }: FieldItemProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </h3>
      <p className="text-base font-medium">{value || fallback || 'N/A'}</p>
    </div>
  );
}

export function DetailFields({
  description,
  validSince,
  createdAt,
  updatedAt,
  tags,
}: DetailFieldsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <FieldItem label="Description" value={description} fallback="No description available" />
        <FieldItem label="Valid Since" value={formatDate(validSince)} />
        <FieldItem label="Created At" value={formatDate(createdAt)} />
        <FieldItem label="Updated At" value={formatDate(updatedAt)} />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length > 0 ? (
            tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground italic">No tags</span>
          )}
        </div>
      </div>
    </>
  );
}
