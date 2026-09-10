import { loginAdmin } from "@/app/admin/actions"
import { isAdmin } from "@/lib/admin"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; token?: string }>
}) {
  const params = await searchParams
  if (await isAdmin(params.token)) {
    redirect("/admin/events")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50 px-4">
      <form action={loginAdmin} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-pink-600">PINKYS UP</p>
        <h1 className="mt-2 font-display text-3xl text-gray-900">Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the access code to add events and read quote requests.
        </p>
        <label htmlFor="token" className="mt-6 block text-sm font-medium text-gray-700">
          Access code
        </label>
        <input
          id="token"
          name="token"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 h-11 w-full rounded-md border border-gray-200 px-3"
        />
        {params.error ? (
          <p className="mt-2 text-sm text-red-600">That code didn&apos;t match. Try again.</p>
        ) : null}
        <button
          type="submit"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#9d174d] px-7 text-sm font-medium tracking-wide text-white hover:bg-[#831843]"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
