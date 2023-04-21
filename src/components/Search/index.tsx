/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cn } from "@/utils/cn";
import React from "react";

interface SearchProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({
  className,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <div className={cn("rounded-lg", className)}>
      <label
        htmlFor="search"
        className="text-xs font-bold uppercase tracking-widest text-stone-500"
      >
        Interview a Wikipedia page
      </label>
      <div className="flex w-full items-center justify-between rounded-lg border p-3 focus-within:outline focus-within:outline-purple-400">
        <input
          id="search"
          className="w-full outline-none"
          type="text"
          placeholder="Add a Wikipedia URL, or search for a page."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
        />
        <button
          type="submit"
          className="w-32 rounded-lg bg-stone-800 p-2 text-white"
          onClick={onSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
