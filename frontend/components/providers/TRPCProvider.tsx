'use client';

/**
 * TRPCProvider wraps the app with React Query and tRPC providers
 * Enables tRPC hooks throughout the application
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trpc, getTRPCClientOptions } from '@/lib/trpc-react';

interface TRPCProviderProps {
  children: React.ReactNode;
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus
            refetchOnWindowFocus: false,
            // Retry failed requests once
            retry: 1,
            // Keep data fresh for 30 seconds
            staleTime: 30 * 1000,
          },
        },
      })
  );

  const [trpcClient] = useState(() => trpc.createClient(getTRPCClientOptions()));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
