'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { CableModemFilters } from '@/components/cable-modem/CableModemFilters';
import { CableModemGrid } from '@/components/cable-modem/CableModemGrid';
import { CableModemResultsCount } from '@/components/cable-modem/CableModemResultsCount';
import { CableModemFiltersProvider } from '@/contexts/CableModemFiltersContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
  const handleCreate = () => {
    console.log('Open create modal');
  };

  return (
    <CableModemFiltersProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <PageHeader
            title="Cable Modem Management"
            subtitle="Manage and monitor your cable modem infrastructure"
          />

          {/* Search and Create Action */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch sm:items-center">
            <CableModemFilters />
            <Button className="w-full sm:w-auto shrink-0" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" /> Create Modem
            </Button>
          </div>

          <CableModemResultsCount />

          <CableModemGrid />
        </div>
      </div>
    </CableModemFiltersProvider>
  );
}
