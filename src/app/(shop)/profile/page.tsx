"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfo } from "@/components/profile/user-info";
import { PersonalData } from "@/components/profile/personal-data";
import { SecurityOptions } from "@/components/profile/security-options";
import { useUserStore } from "@/store/user";
import Link from "next/link";
import { useMounted } from "@/hooks/use-mounted";
// import { Preferences } from "@/components/profile/preferences";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">No estás autenticado</h1>
        <p className="text-sm text-muted-foreground">
          Por favor,{" "}
          <Link href="/auth/login" className="underline">
            <span className="dark:text-orange-200/90">iniciar sesión </span>
          </Link>{" "}
          para acceder a tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Datos Personales</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            {/* <TabsTrigger value="preferences">Preferencias</TabsTrigger> */}
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <PersonalData />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecurityOptions />
          </TabsContent>

          {/* <TabsContent value="preferences" className="mt-6">
            <Preferences />
          </TabsContent> */}
        </Tabs>
      </div>
      <UserInfo />
    </div>
  );
}
