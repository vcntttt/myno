"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/navigation/theme-switcher";
import { ShoppingCartButton } from "./shopping-cart";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // es para mobile
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const session = false;

  return (
    <header
      className={`sticky top-0 z-50 max-w-7xl mx-auto bg-background transition-all duration-200 ${
        hasScrolled ? "border-b shadow-sm" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link
          href="/"
          className="text-xl font-semibold flex items-center gap-x-2"
        >
          <Logo />
          Myno
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild size="icon" aria-label="Carrito">
            <Link href={`/cart`}>
              <ShoppingCartButton />
            </Link>
          </Button>
          <div className="items-center hidden md:flex">
            <div className="relative flex items-center w-64 h-9">
              <Input
                type="search"
                placeholder="Buscador"
                className="h-9 w-full"
              />
              <Button size="sm" variant="ghost" className="absolute right-0">
                <Link href={`/search`}>
                  <Search className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Search Toggle */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar"
            >
              {isSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Profile Dropdown */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Perfil">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/history">Historial</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild aria-label="Iniciar Sesión">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button
                asChild
                aria-label="Iniciar Sesión"
                className="hidden md:inline-flex"
              >
                <Link href="/auth/register">Registro</Link>
              </Button>
            </>
          )}
          <ThemeSwitcher />
        </div>
      </div>

      {/* Mobile Search Bar (Conditional) */}
      {isSearchOpen && (
        <div className="p-2 border-b md:hidden">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Buscador"
              className="h-9 w-full"
              autoFocus
            />
            <Button size="sm" variant="ghost" className="absolute right-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
