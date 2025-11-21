import { z } from 'zod';

export const cableModemStatusSchema = z.enum(['Active', 'Suspended', 'Provision']);

export const cableModemIdSchema = z.object({
  id: z.string().uuid(),
});

export const cableModemQuerySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    status: cableModemStatusSchema.optional(),
  })
  .strict();

export const cableModemCreateSchema = z
  .object({
    name: z.string().trim().min(3),
    description: z.string().trim().min(1).optional().nullable(),
    status: cableModemStatusSchema.default('Active'),
    validSince: z.string().datetime().optional().nullable(),
    tags: z.array(z.string().trim().min(1)).default([]),
  })
  .strict();

export const cableModemUpdateSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().trim().min(3),
    description: z.string().trim().min(1).optional().nullable(),
    status: cableModemStatusSchema.default('Active'),
    validSince: z.string().datetime().optional().nullable(),
    tags: z.array(z.string().trim().min(1)).default([]),
  })
  .strict();
