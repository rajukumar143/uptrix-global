import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const ready = adminConfigured();

  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_30px_60px_-40px_rgba(15,23,42,.45)]">
        <Image src="/logo-dark.png" alt="Uptrix" width={756} height={235} priority className="h-9 w-auto" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Edit the text on every page of the website.</p>
        {ready ? (
          <LoginForm />
        ) : (
          <p role="alert" className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
            The admin dashboard is not set up yet. Add <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code> and{" "}
            <code>ADMIN_SESSION_SECRET</code> (32+ characters) to the server&apos;s environment, then restart the site.
          </p>
        )}
      </div>
    </main>
  );
}
