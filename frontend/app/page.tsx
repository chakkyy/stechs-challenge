'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { CableModemFilters } from '@/components/cable-modem/filters/CableModemFilters';
import { CableModemGrid } from '@/components/cable-modem/grid/CableModemGrid';
import { CableModemResultsCount } from '@/components/cable-modem/filters/CableModemResultsCount';
import { CreateModal } from '@/components/cable-modem/create/CreateModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <PageHeader
          title="Cable Modem Management"
          subtitle="Manage and monitor your cable modem infrastructure"
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-stretch sm:items-center">
          <CableModemFilters />
          <CreateModal />
        </div>

        <CableModemResultsCount />

        <CableModemGrid />
      </div>
    </div>
  );
}
