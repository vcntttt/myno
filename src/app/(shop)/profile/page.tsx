"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfo } from "@/components/profile/user-info";
import { PersonalData } from "@/components/profile/personal-data";
import { SecurityOptions } from "@/components/profile/security-options";
import { useUserStore } from "@/store/user";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/auth/non-authorized");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Datos Personales</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <PersonalData />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <SecurityOptions />
          </TabsContent>
        </Tabs>
      </div>
      <UserInfo />
    </div>
  );
}
