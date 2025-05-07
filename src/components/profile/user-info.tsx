"use client";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  function handleLogout() {
    logout();
    redirect("/");
  }

  return (
    <div className="w-full md:w-1/3">
      <Card>
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              // src="https://i.pinimg.com/736x/de/b9/2f/deb92ffd7466cf5830cafb47afeb9b2f.jpg"
              alt="Foto de perfil"
            />
            <AvatarFallback>{user?.email[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">
            {} {}
          </CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        {/* <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Miembro desde:</span>
              <span>{}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compras:</span>
              <span>{}</span>
            </div>
          </div>
        </CardContent> */}
        <CardFooter className="flex flex-col gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile/history">Ver Historial de Compras</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
