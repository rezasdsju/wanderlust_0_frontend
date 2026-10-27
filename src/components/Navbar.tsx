'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import PopOver from "./PopOver";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/all-destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession()
  const pathName = usePathname()

  return (
    <header className="relative z-10 mx-2 mt-2 flex h-8 shrink-0 items-center justify-between bg-white px-4 text-[10px] text-slate-950 shadow-sm sm:px-5">
      <nav aria-label="Main navigation" className="hidden items-center gap-5 md:flex">
        {primaryLinks.map(({ label, href }) => {
          const current = pathName === href
          return (
            <Link
              key={label}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`whitespace-nowrap transition-colors hover:text-cyan-600 ${
                current ? "text-cyan-600 underline underline-offset-2" : ""
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <Link
        href="/"
        aria-label="Wanderlast home"
        className="absolute left-1/2 -translate-x-1/2"
      >
        <Image
          src="/images/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
          priority
          className="h-auto w-24"
        />
      </Link>

      <nav aria-label="Account navigation" className="ml-auto flex items-center gap-3 sm:gap-5">
        {session?.user ? (
          <PopOver session={session} />
        ) : (
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/login"
              className="whitespace-nowrap transition-colors hover:text-cyan-600"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="whitespace-nowrap transition-colors hover:text-cyan-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}