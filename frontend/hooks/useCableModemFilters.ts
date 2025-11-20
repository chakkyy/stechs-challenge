import { useState, useMemo } from 'react';
import { CableModem } from '@/lib/types';
import { searchCableModems } from '@/lib/search';

interface UseCableModemFiltersProps {
  data: CableModem[];
}

interface UseCableModemFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredResults: CableModem[];
  handleSearch: (term: string) => void;
  handleClearSearch: () => void;
}

export function useCableModemFilters({
  data,
}: UseCableModemFiltersProps): UseCableModemFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Compute filtered results based on search query
  const filteredResults = useMemo(() => {
    return searchCableModems(data, searchQuery);
  }, [data, searchQuery]);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredResults,
    handleSearch,
    handleClearSearch,
  };
}
