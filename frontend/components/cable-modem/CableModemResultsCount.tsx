import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';

export function CableModemResultsCount() {
  const { filteredResults } = useCableModemFiltersContext();

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground">
        {filteredResults.length} {filteredResults.length === 1 ? 'modem' : 'modems'} found
      </p>
    </div>
  );
}
