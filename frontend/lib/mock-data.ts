import { CableModem } from './types';

export const MOCK_CABLE_MODEMS: CableModem[] = [
  {
    id: '1',
    name: 'CM 100 MB',
    description: 'Standard 100MB connection',
    status: 'Active',
    validSince: '2023-01-01T00:00:00Z',
    tags: ['home', 'standard'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'CM 200 MB Pro',
    description: 'High speed 200MB connection for professionals',
    status: 'Active',
    validSince: '2023-02-15T10:30:00Z',
    tags: ['business', 'pro'],
    createdAt: '2023-02-15T10:30:00Z',
    updatedAt: '2023-02-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'CM 50 MB Legacy',
    description: 'Legacy 50MB connection',
    status: 'Suspended',
    validSince: '2022-06-01T09:00:00Z',
    tags: ['legacy', 'residential'],
    createdAt: '2022-06-01T09:00:00Z',
    updatedAt: '2023-03-10T14:20:00Z',
  },
  {
    id: '4',
    name: 'CM 1 GB Fiber',
    description: 'Ultra fast 1GB fiber connection',
    status: 'Provision',
    validSince: null,
    tags: ['fiber', 'premium'],
    createdAt: '2023-11-01T08:00:00Z',
    updatedAt: '2023-11-01T08:00:00Z',
  },
  {
    id: '5',
    name: 'CM 300 MB',
    description: null,
    status: 'Active',
    validSince: '2023-05-20T11:15:00Z',
    tags: [],
    createdAt: '2023-05-20T11:15:00Z',
    updatedAt: '2023-05-20T11:15:00Z',
  },
  {
    id: '6',
    name: 'CM 100 MB V2',
    description: 'Updated 100MB hardware',
    status: 'Active',
    validSince: '2023-08-05T16:45:00Z',
    tags: ['home', 'v2'],
    createdAt: '2023-08-05T16:45:00Z',
    updatedAt: '2023-08-05T16:45:00Z',
  },
];

export function getMockCableModems(): Promise<CableModem[]> {
  return Promise.resolve(MOCK_CABLE_MODEMS);
}

export function getMockCableModemById(id: string): Promise<CableModem | undefined> {
  return Promise.resolve(MOCK_CABLE_MODEMS.find((cm) => cm.id === id));
}
