/**
 * Vanilla tRPC client for server-side or non-React usage
 */

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@/types/router';
import { API_URL } from './env';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
    }),
  ],
});
