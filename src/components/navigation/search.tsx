import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="items-center hidden md:flex">
      <div className="relative flex items-center w-64 h-9">
        <Input type="search" placeholder="Buscador" className="h-9 w-full" />
        <Button size="sm" variant="ghost" className="absolute right-0">
          <Link href={`/search`}>
            <Search className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
