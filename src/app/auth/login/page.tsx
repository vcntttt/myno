import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Inicia sesión en tu cuenta | Myno Tienda Mayorista",
  description:
    "Accede a tu cuenta en Myno para gestionar compras mayoristas fácilmente.",
  openGraph: {
    title: "Inicia sesión | Myno Tienda Mayorista",
    description:
      "Accede a tu cuenta en Myno y comienza a comprar al por mayor.",
    url: "https://myno-vr.vercel.app/auth/login",
    images: ["/og-logo.png"],
    siteName: "Myno",
    locale: "es_CL",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Inicia Sesión</CardTitle>
        <CardDescription className="text-xs md:text-sm sr-only">
          Ingrese su correo electrónico a continuación para iniciar sesión en su
          cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-center text-xs text-neutral-500 w-full">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="underline">
            <span className="dark:text-orange-200/90">Registrate ahora.</span>
          </Link>
        </p>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by <span className="text-neutral-600">better-auth.</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
