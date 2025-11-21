import { notFound } from 'next/navigation';
import { getMockCableModemById } from '@/lib/mock-data';
import { CableModemDetail } from '@/components/cable-modem/detail/CableModemDetail';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CableModemDetailPage({ params }: PageProps) {
  const cableModem = await getMockCableModemById(params.id);

  if (!cableModem) {
    notFound();
  }

  return <CableModemDetail cableModem={cableModem} />;
}
