/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { trpc } from '@/lib/trpc-react';

interface DeleteDialogProps {
  cableModemId: string;
  cableModemName: string;
  children: ReactNode;
}

export function DeleteDialog({ cableModemId, cableModemName, children }: DeleteDialogProps) {
  const router = useRouter();
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.cableModem.delete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch cable modems list
      utils.cableModems.invalidate();
      utils.cableModem.byId.invalidate({ id: cableModemId });

      toast({
        title: 'Cable Modem Deleted',
        description: `Cable modem "${cableModemName}" has been deleted.`,
      });

      router.push('/');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete cable modem',
        variant: 'destructive',
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: cableModemId });
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
          <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
