import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchTermChange, onSearch }: SearchBarProps) {
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex-1">
      <Input
        type="text"
        placeholder="Search modems by name, description, tag or status..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pr-[52px]"
        aria-label="Search cable modems"
      />
      <button
        onClick={handleSearch}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 rounded-md px-2.5 py-1.5 transition-colors border border-gray-200 shadow-sm"
        aria-label="Search"
        type="button"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
}
