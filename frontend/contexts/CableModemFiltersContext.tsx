'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { trpc } from '@/lib/trpc-react';
import { CableModem } from '@/lib/types';

interface CableModemFiltersContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchQuery: string;
  handleSearch: (term: string) => void;
  handleClearSearch: () => void;
  cableModems: CableModem[];
  isLoading: boolean;
  error: Error | null;
}

const CableModemFiltersContext = createContext<CableModemFiltersContextType | undefined>(undefined);

export function CableModemFiltersProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch cable modems from backend using tRPC
  const { data, isLoading, error } = trpc.cableModems.useQuery(
    searchQuery ? { name: searchQuery } : undefined
  );

  const cableModems = data || [];

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return (
    <CableModemFiltersContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchQuery,
        handleSearch,
        handleClearSearch,
        cableModems,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </CableModemFiltersContext.Provider>
  );
}

export function useCableModemFiltersContext() {
  const context = useContext(CableModemFiltersContext);
  if (context === undefined) {
    throw new Error('useCableModemFiltersContext must be used within a CableModemFiltersProvider');
  }
  return context;
}
