import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Registro</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Ingrese su información para crear una cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-center text-xs text-neutral-500 w-full">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="underline">
            <span className="dark:text-orange-200/90">
              Inicia sesión ahora.
            </span>
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
