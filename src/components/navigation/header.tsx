"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { SearchBar } from "./search";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import { UserZoneSkeleton } from "@/components/navigation/user-zone-skeleton";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/auth/non-authorized");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  return (
    <header
      className={`sticky top-0 z-50 max-w-7xl mx-auto bg-background transition-all duration-200`}
    >
      <div className="container max-w-7xl flex items-center justify-between h-16 px-4 mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Logo />
          Myno
        </Link>

        <div className="flex items-center gap-2">
          {/* Carrito */}
          <Button variant="ghost" asChild size="icon" aria-label="Carrito">
            <Link href={`/cart`}>
              <ShoppingCartButton />
            </Link>
          </Button>

          {/* Desktop Search */}
          <div className="hidden md:flex">
            <SearchBar />
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

          {/* Zona de usuario */}
          {!mounted ? (
            <UserZoneSkeleton />
          ) : user ? (
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
                <DropdownMenuItem onClick={() => logout()}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild aria-label="Iniciar Sesión">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
              <Button
                asChild
                className="hidden md:inline-flex"
                aria-label="Registro"
              >
                <Link href="/auth/register">Registro</Link>
              </Button>
            </>
          )}

          <ThemeSwitcher />
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="border-b p-2 md:hidden">
          <SearchBar />
        </div>
      )}
    </header>
  );
}
