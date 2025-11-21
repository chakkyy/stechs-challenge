import { prisma } from '../src/db';
import { CableModemStatus } from '@prisma/client';

const seedData = [
  {
    id: '123e4567-e89b-12d3-a456-426655440001',
    name: 'CM 100 MB',
    description: 'Standard 100MB connection',
    status: CableModemStatus.Active,
    validSince: new Date('2023-01-01T00:00:00.000Z'),
    tags: ['home', 'standard'],
  },
  {
    id: '123e4567-e89b-12d3-a456-426655440002',
    name: 'CM 200 MB Pro',
    description: 'High speed 200MB connection for professionals',
    status: CableModemStatus.Active,
    validSince: new Date('2023-02-15T10:30:00.000Z'),
    tags: ['business', 'pro'],
  },
  {
    id: '123e4567-e89b-12d3-a456-426655440003',
    name: 'CM 50 MB Legacy',
    description: 'Legacy 50MB connection',
    status: CableModemStatus.Suspended,
    validSince: new Date('2022-06-01T09:00:00.000Z'),
    tags: ['legacy', 'residential'],
  },
  {
    id: '123e4567-e89b-12d3-a456-426655440004',
    name: 'CM 1 GB Fiber',
    description: 'Ultra fast 1GB fiber connection',
    status: CableModemStatus.Provision,
    validSince: null,
    tags: ['fiber', 'premium'],
  },
  {
    id: '123e4567-e89b-12d3-a456-426655440005',
    name: 'CM 300 MB',
    description: null,
    status: CableModemStatus.Active,
    validSince: new Date('2023-05-20T11:15:00.000Z'),
    tags: [],
  },
  {
    id: '123e4567-e89b-12d3-a456-426655440006',
    name: 'CM 100 MB V2',
    description: 'Updated 100MB hardware',
    status: CableModemStatus.Active,
    validSince: new Date('2023-08-05T16:45:00.000Z'),
    tags: ['home', 'v2'],
  },
];

const seed = async () => {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.cableModem.deleteMany({});
  console.log('Cleared existing cable modems');

  // Seed cable modems
  for (const modem of seedData) {
    await prisma.cableModem.create({
      data: modem,
    });
    console.log(`  ✓ Created: ${modem.name}`);
  }

  console.log('✅ Seeding complete!');
};

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
