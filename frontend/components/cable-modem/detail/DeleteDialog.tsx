'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';
import { useToast } from '@/hooks/use-toast';

interface DeleteDialogProps {
  cableModemId: string;
  cableModemName: string;
  children: ReactNode;
}

export function DeleteDialog({ cableModemId, cableModemName, children }: DeleteDialogProps) {
  const router = useRouter();
  const { removeCableModem } = useCableModemFiltersContext();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    removeCableModem(cableModemId);
    toast({
      title: 'Cable Modem Deleted',
      description: `Cable modem "${cableModemName}" has been deleted.`,
    });
    router.push('/');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the cable modem
            <span className="font-semibold text-foreground"> {cableModemName} </span>
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
