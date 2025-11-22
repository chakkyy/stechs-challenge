export type CableModemStatus = 'Active' | 'Suspended' | 'Provision';

export const CableModemStatusValues = {
  Active: 'Active' as const,
  Suspended: 'Suspended' as const,
  Provision: 'Provision' as const,
};

export type CableModem = {
  id: string;
  name: string;
  description: string | null;
  status: CableModemStatus;
  validSince: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CableModemCreate = Omit<CableModem, 'id' | 'createdAt' | 'updatedAt'>;
