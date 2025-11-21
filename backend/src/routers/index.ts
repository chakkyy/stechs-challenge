import { router } from '@/trpc';
import { cableModemListProcedure, cableModemRouter } from '@/routers/cableModem.router';

export const appRouter = router({
  cableModems: cableModemListProcedure,
  cableModem: cableModemRouter,
});

export type AppRouter = typeof appRouter;
