"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";

interface SearchInputProps {
  onSearch?: (term: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const prevTermRef = useRef<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const term = debouncedTerm.trim();
    if (!term || term === prevTermRef.current) return;

    onSearch?.(term);
    prevTermRef.current = term;
  }, [debouncedTerm, onSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const term = searchTerm.trim();
      if (term === prevTermRef.current) return;

      onSearch?.(term);
      prevTermRef.current = term;
    }
  };

  return (
    <div className="flex justify-end relative">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute top-[-60px] border border-white placeholder-white text-white p-2 mb-4 rounded w-full max-w-[300px]"
      />
    </div>
  );
};

export default SearchInput;
