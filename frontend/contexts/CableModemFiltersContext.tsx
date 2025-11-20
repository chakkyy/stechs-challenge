'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCableModemFilters } from '@/hooks/useCableModemFilters';
import { MOCK_CABLE_MODEMS } from '@/lib/mock-data';
import { CableModem } from '@/lib/types';

interface CableModemFiltersContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredResults: CableModem[];
  handleSearch: (term: string) => void;
  handleClearSearch: () => void;
}

const CableModemFiltersContext = createContext<CableModemFiltersContextType | undefined>(
  undefined
);

export function CableModemFiltersProvider({ children }: { children: ReactNode }) {
  const filters = useCableModemFilters({ data: MOCK_CABLE_MODEMS });

  return (
    <CableModemFiltersContext.Provider value={filters}>
      {children}
    </CableModemFiltersContext.Provider>
  );
}

export function useCableModemFiltersContext() {
  const context = useContext(CableModemFiltersContext);
  if (context === undefined) {
    throw new Error(
      'useCableModemFiltersContext must be used within a CableModemFiltersProvider'
    );
  }
  return context;
}
