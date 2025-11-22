import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';

export function CableModemResultsCount() {
  const { cableModems, isLoading } = useCableModemFiltersContext();

  if (isLoading) {
    return (
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground">
        {cableModems.length} {cableModems.length === 1 ? 'modem' : 'modems'} found
      </p>
    </div>
  );
}
