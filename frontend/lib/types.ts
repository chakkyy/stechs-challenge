export enum CableModemStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Provision = 'Provision',
}

export interface CableModem {
  id: string;
  name: string;
  description: string | null;
  status: CableModemStatus;
  validSince: string | null;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CableModemCreate = Omit<CableModem, 'id' | 'createdAt' | 'updatedAt'>;
