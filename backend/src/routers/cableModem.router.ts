import { CableModemStatus, Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { prisma } from '@/db';
import { publicProcedure, router } from '@/trpc';
import {
  cableModemCreateSchema,
  cableModemIdSchema,
  cableModemQuerySchema,
  cableModemUpdateSchema,
} from '@/schemas/cableModem.schema';

/**
 * Builds Prisma filters mirroring Swagger query params.
 */
const buildWhereClause = (input?: {
  name?: string;
  status?: CableModemStatus;
}): Prisma.CableModemWhereInput => {
  if (!input) {
    return {};
  }

  const filters: Prisma.CableModemWhereInput = {};

  if (input.name) {
    filters.name = {
      contains: input.name,
      mode: 'insensitive',
    };
  }

  if (input.status) {
    filters.status = input.status;
  }

  return filters;
};

/**
 * Lists cable modems with optional name/status filters.
 */
export const cableModemListProcedure = publicProcedure
  .input(cableModemQuerySchema.optional())
  .query(async ({ input }) => {
    const where = buildWhereClause(input);

    return prisma.cableModem.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

/**
 * Router scoped to single cable modem operations.
 */
export const cableModemRouter = router({
  byId: publicProcedure.input(cableModemIdSchema).query(async ({ input }) => {
    const modem = await prisma.cableModem.findUnique({
      where: { id: input.id },
    });

    if (!modem) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cable modem not found',
      });
    }

    return modem;
  }),
  create: publicProcedure.input(cableModemCreateSchema).mutation(async ({ input }) => {
    const existing = await prisma.cableModem.findUnique({
      where: { name: input.name },
    });

    if (existing) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `Cable modem name "${input.name}" already exists`,
      });
    }

    try {
      const data = {
        ...input,
        tags: input.tags ?? [],
        description: input.description ?? null,
        validSince: input.validSince ? new Date(input.validSince) : null,
      };

      return await prisma.cableModem.create({
        data,
      });
    } catch (error) {
      // Handle race condition where name was inserted between check and create
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Cable modem name "${input.name}" already exists`,
        });
      }
      throw error;
    }
  }),
  update: publicProcedure.input(cableModemUpdateSchema).mutation(async ({ input }) => {
    const { id, ...updateData } = input;

    // Check if record exists
    const existing = await prisma.cableModem.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cable modem not found',
      });
    }

    // Check name uniqueness only if name is changing
    if (updateData.name !== existing.name) {
      const nameExists = await prisma.cableModem.findUnique({
        where: { name: updateData.name },
      });

      if (nameExists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Cable modem name "${updateData.name}" already exists`,
        });
      }
    }

    try {
      const data = {
        ...updateData,
        tags: updateData.tags ?? [],
        description: updateData.description ?? null,
        validSince: updateData.validSince ? new Date(updateData.validSince) : null,
      };

      return await prisma.cableModem.update({
        where: { id },
        data,
      });
    } catch (error) {
      // Handle race condition for name uniqueness
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Cable modem name "${updateData.name}" already exists`,
        });
      }
      throw error;
    }
  }),
  delete: publicProcedure.input(cableModemIdSchema).mutation(async ({ input }) => {
    try {
      await prisma.cableModem.delete({
        where: { id: input.id },
      });
    } catch (error) {
      // Prisma throws P2025 when record not found
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Cable modem not found',
        });
      }
      throw error;
    }
  }),
});
