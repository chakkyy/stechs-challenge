'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { useCableModemFilters } from '@/hooks/useCableModemFilters';
import { MOCK_CABLE_MODEMS } from '@/lib/mock-data';
import { CableModem, CableModemCreate } from '@/lib/types';

interface CableModemFiltersContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredResults: CableModem[];
  handleSearch: (term: string) => void;
  handleClearSearch: () => void;
  cableModems: CableModem[];
  addCableModem: (modem: CableModemCreate) => CableModem;
}

const CableModemFiltersContext = createContext<CableModemFiltersContextType | undefined>(
  undefined
);

export function CableModemFiltersProvider({ children }: { children: ReactNode }) {
  const [cableModems, setCableModems] = useState<CableModem[]>(MOCK_CABLE_MODEMS);
  
  const filters = useCableModemFilters({ data: cableModems });

  const addCableModem = (modemData: CableModemCreate): CableModem => {
    // Temporary generation of sequential ID
    const maxId = cableModems.reduce((max, modem) => {
      const id = parseInt(modem.id, 10);
      return !isNaN(id) && id > max ? id : max;
    }, 0);
    const newId = (maxId + 1).toString();

    // Timestamps will be generated on the BE 
    const now = new Date().toISOString();
    const newModem: CableModem = {
      ...modemData,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    setCableModems((prev) => [...prev, newModem]);
    return newModem;
  };

  return (
    <CableModemFiltersContext.Provider value={{ ...filters, cableModems, addCableModem }}>
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
