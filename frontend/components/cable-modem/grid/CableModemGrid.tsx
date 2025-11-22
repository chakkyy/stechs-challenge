import { Button } from '@/components/ui/button';
import { CableModemCard } from './CableModemCard';
import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';

export function CableModemGrid() {
  const { cableModems, isLoading, error, handleClearSearch } = useCableModemFiltersContext();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="text-muted-foreground text-sm mt-4">Loading cable modems...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">Error loading cable modems</p>
        <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (cableModems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No modems found</p>
        <p className="text-muted-foreground text-sm mt-2">
          Try adjusting your search or create a new modem
        </p>
        <Button variant="link" onClick={handleClearSearch} className="mt-4">
          Clear Search
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cableModems.map((cm) => (
        <CableModemCard key={cm.id} cableModem={cm} />
      ))}
    </div>
  );
}
