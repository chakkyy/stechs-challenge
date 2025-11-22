import { z } from 'zod';

export enum CableModemFieldNames {
  NAME = 'name',
  DESCRIPTION = 'description',
  STATUS = 'status',
  VALID_SINCE = 'validSince',
  TAGS = 'tags',
}

/**
 * Zod validation schema for creating a new Cable Modem
 * Based on swagger_stechs.yml CableModemCreate schema
 */
export const cableModemCreateSchema = z.object({
  [CableModemFieldNames.NAME]: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),

  [CableModemFieldNames.DESCRIPTION]: z.string().optional().or(z.literal('')),
  [CableModemFieldNames.STATUS]: z.enum(['Active', 'Suspended', 'Provision'], {
    required_error: 'Status is required',
  }),
  [CableModemFieldNames.VALID_SINCE]: z.string().optional().or(z.literal('')),
  [CableModemFieldNames.TAGS]: z.array(z.string()).optional(),
});

export type CableModemCreateInput = z.infer<typeof cableModemCreateSchema>;
