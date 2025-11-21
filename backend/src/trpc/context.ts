/**
 * tRPC context - currently empty but can be extended with:
 * - User authentication data (from request headers/cookies)
 * - Request metadata (IP, user agent, etc.)
 * - Database connections
 * - Logger instances
 *
 * To add request data, import CreateFastifyContextOptions from '@trpc/server/adapters/fastify'
 * and accept it as parameter: createContext(opts: CreateFastifyContextOptions)
 */
export type Context = Record<string, never>;

export const createContext = (): Context => {
  return {};
};
