import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import MyBookingCard, { type Booking } from "@/components/bookings/MyBookingCard";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  let bookings: Booking[] = [];

  if (user?.email) {
    try {
      const res = await fetch(
        `http://localhost:5000/my-bookings/${user.email}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        bookings = await res.json();
      }
    } catch {
      bookings = [];
    }
  }

  return (
    <main className="flex-1 bg-white px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950">
          My Bookings
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Manage and view your upcoming travel plans
        </p>

        {bookings.length > 0 ? (
          <div className="mt-7 grid gap-4">
            {bookings.map((booking) => (
              <MyBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-sm border border-dashed border-slate-200 px-6 py-16 text-center">
            <p className="text-sm text-slate-600">
              You do not have any bookings yet.
            </p>
            <Link
              href="/all-destinations"
              className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1598ff] transition-colors hover:text-[#0d86e8]"
            >
              Explore destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingPage;
