import Link from "next/link";

export default function NonAuthorizedPage() {
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
      <Link href={"/"}>Volver al inicio</Link>
    </div>
  );
}
