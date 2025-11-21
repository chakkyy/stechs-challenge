import { Button } from '@/components/ui/button';
import { CableModemCard } from './CableModemCard';
import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';

export function CableModemGrid() {
  const { filteredResults, handleClearSearch } = useCableModemFiltersContext();

  if (filteredResults.length === 0) {
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
      {filteredResults.map((cm) => (
        <CableModemCard key={cm.id} cableModem={cm} />
      ))}
    </div>
  );
}
