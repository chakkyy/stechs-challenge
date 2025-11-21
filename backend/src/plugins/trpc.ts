import { fastifyTRPCPlugin, type FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { appRouter, type AppRouter } from '@/routers';
import { createContext } from '@/trpc/context';

const registerTRPC: FastifyPluginAsync = async (server) => {
  const trpcOptions: FastifyTRPCPluginOptions<AppRouter>['trpcOptions'] = {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      server.log.error({ err: error, path }, 'tRPC handler failure');
    },
  };

  await server.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions,
  });
};

export const trpcPlugin = fastifyPlugin(registerTRPC, {
  fastify: '4.x',
  name: 'trpc-plugin',
});

export default trpcPlugin;
