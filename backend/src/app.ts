import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import Fastify from 'fastify';

import { trpcPlugin } from '@/plugins/trpc';

const server = Fastify({
  logger: true,
});

server.get('/health', async () => {
  return { status: 'ok' };
});

const registerPlugins = async () => {
  const allowedOrigins =
    process.env.CORS_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [];
  const isProduction = process.env.NODE_ENV === 'production';

  const corsOrigin =
    isProduction && allowedOrigins.length === 0 ? true : isProduction ? allowedOrigins : true;

  if (isProduction && allowedOrigins.length === 0) {
    server.log.warn('CORS_ORIGINS not configured, defaulting to permissive CORS policy.');
  }

  await server.register(cors, {
    origin: corsOrigin,
    credentials: true,
  });

  await server.register(helmet, {
    // Disable CSP for local dev; can be enabled with stricter policy later
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });

  await server.register(trpcPlugin);
};

const start = async () => {
  try {
    await registerPlugins();

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    const host = process.env.HOST ?? '0.0.0.0';

    await server.listen({ port, host });
    server.log.info({ port, host }, 'Server listening');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
