import { CableModem } from './types';

/**
 * Filters cable modems based on a search term.
 * Matches against name, description, and tags.
 * Case-insensitive and partial matching.
 */
export function searchCableModems(items: CableModem[], searchTerm: string): CableModem[] {
  if (!searchTerm.trim()) return items;

  const lowerTerm = searchTerm.toLowerCase().trim();

  return items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(lowerTerm);
    const descMatch = item.description?.toLowerCase().includes(lowerTerm) ?? false;
    const tagsMatch = item.tags.some((tag) => tag.toLowerCase().includes(lowerTerm));
    const statusMatch = item.status.toLowerCase().includes(lowerTerm);

    return nameMatch || descMatch || tagsMatch || statusMatch;
  });
}
