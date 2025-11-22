/**
 * tRPC React Query client for React hooks
 */

import { CreateTRPCReact, createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { API_URL } from './env';
import { AppRouter } from '@/types/router';

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>();

/**
 * Get the base URL for tRPC requests
 * Handles both server-side and client-side rendering
 */
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or default
    return API_URL;
  }

  // Server-side: use environment variable or localhost
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
}

/**
 * tRPC client options for React Query
 */
export function getTRPCClientOptions() {
  return {
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  };
}
