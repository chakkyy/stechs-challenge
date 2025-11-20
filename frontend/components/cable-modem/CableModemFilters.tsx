import { SearchBar } from '@/components/cable-modem/SearchBar';
import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';

export function CableModemFilters() {
  const { searchTerm, setSearchTerm, handleSearch } = useCableModemFiltersContext();
  
  return (
    <SearchBar
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      onSearch={handleSearch}
    />
  );
}
