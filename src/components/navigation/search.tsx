"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <div className="relative flex items-center w-full md:w-64 h-9">
      <Input
        type="search"
        placeholder="Buscador"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-9 w-full"
        onKeyDown={handleKeyDown}
      />
      <Button size="sm" variant="ghost" className="absolute right-0">
        <Link href={`/search?query=${searchQuery}`}>
          <Search className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};
