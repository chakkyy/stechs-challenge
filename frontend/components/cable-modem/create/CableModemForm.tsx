'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import {
  cableModemCreateSchema,
  CableModemCreateInput,
  CableModemFieldNames,
} from '@/lib/validations';
import { useCableModemFiltersContext } from '@/contexts/CableModemFiltersContext';
import { toast } from '@/hooks/use-toast';
import { CableModemStatus } from '@/lib/types';

interface CableModemFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CableModemForm({ onSuccess, onCancel }: CableModemFormProps) {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { addCableModem } = useCableModemFiltersContext();

  // Get today's date in YYYY-MM-DD format for default value
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CableModemCreateInput>({
    resolver: zodResolver(cableModemCreateSchema),
    defaultValues: {
      [CableModemFieldNames.NAME]: '',
      [CableModemFieldNames.DESCRIPTION]: '',
      [CableModemFieldNames.STATUS]: CableModemStatus.Active,
      [CableModemFieldNames.VALID_SINCE]: today,
      [CableModemFieldNames.TAGS]: [],
    },
  });

  const status = watch(CableModemFieldNames.STATUS);
  const validSince = watch(CableModemFieldNames.VALID_SINCE);

  const handleAddTag = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    if (tags.includes(trimmedTag)) {
      toast({
        title: 'Duplicate Tag',
        description: `The tag "${trimmedTag}" already exists.`,
        variant: 'destructive',
      });
      return;
    }

    const newTags = [...tags, trimmedTag];
    setTags(newTags);
    setValue(CableModemFieldNames.TAGS, newTags);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue(CableModemFieldNames.TAGS, newTags);
  };

  const onSubmit = (data: CableModemCreateInput) => {
    try {
      const finalValidSince = data.validSince || today;
      const finalStatus = data.status || CableModemStatus.Active;

      const modemData = {
        ...data,
        description: data.description || null,
        status: finalStatus,
        validSince: finalValidSince
          ? new Date(finalValidSince).toISOString()
          : new Date().toISOString(),
        tags: tags.length > 0 ? tags : [],
      };

      addCableModem(modemData);

      toast({
        title: 'Success',
        description: 'Cable modem created successfully',
        variant: 'success',
      });

      reset();
      setTags([]);
      setTagInput('');
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create cable modem',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor={CableModemFieldNames.NAME}>
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={CableModemFieldNames.NAME}
          placeholder="e.g., CM 100 MB"
          {...register(CableModemFieldNames.NAME)}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor={CableModemFieldNames.DESCRIPTION}>Description</Label>
        <Textarea
          id={CableModemFieldNames.DESCRIPTION}
          placeholder="Describe the cable modem purpose and location"
          rows={3}
          {...register(CableModemFieldNames.DESCRIPTION)}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Status Field */}
      <div className="space-y-2">
        <Label htmlFor={CableModemFieldNames.STATUS}>
          Status <span className="text-destructive">*</span>
        </Label>
        <Select
          value={status}
          onValueChange={(value) =>
            setValue(CableModemFieldNames.STATUS, value as CableModemStatus)
          }
        >
          <SelectTrigger id={CableModemFieldNames.STATUS}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="active" value={CableModemStatus.Active}>
              Active
            </SelectItem>
            <SelectItem key="suspended" value={CableModemStatus.Suspended}>
              Suspended
            </SelectItem>
            <SelectItem key="provision" value={CableModemStatus.Provision}>
              Provision
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
      </div>

      {/* Valid Since Field */}
      <div className="space-y-2 flex flex-col">
        <Label htmlFor={CableModemFieldNames.VALID_SINCE}>Valid Since</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal',
                !validSince && 'text-muted-foreground'
              )}
            >
              {validSince ? format(new Date(validSince), 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={validSince ? new Date(validSince) : undefined}
              onSelect={(date) => {
                setValue(CableModemFieldNames.VALID_SINCE, date ? date.toISOString() : undefined);
              }}
              disabled={(date) => date < new Date('1900-01-01')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.validSince && (
          <p className="text-sm text-destructive">{errors.validSince.message}</p>
        )}
      </div>

      {/* Tags Field */}
      <div className="space-y-2">
        <Label htmlFor={CableModemFieldNames.TAGS}>Tags</Label>
        <div className="flex gap-2">
          <Input
            id={CableModemFieldNames.TAGS}
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(e);
              }
            }}
          />
          <Button type="button" onClick={handleAddTag}>
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-secondary-foreground/20 rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          Create
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
