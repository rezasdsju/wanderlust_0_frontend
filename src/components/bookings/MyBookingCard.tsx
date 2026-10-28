"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  ImageOff,
  Tag,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BASE_API_URL } from "@/lib/api";
import { formatPrice } from "@/lib/destinations";

export type Booking = {
  _id: string;
  username?: string;
  email?: string;
  destinationName: string;
  country?: string;
  category?: string;
  price: string;
  duration?: string;
  departureDate?: string;
  deparatureData?: string;
  imageUrl?: string;
  description?: string;
  bookingDate?: string;
  status?: string;
};

function formatDate(value?: string) {
  if (!value) return "To be announced";

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyBookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  const imageUrl = booking.imageUrl?.trim();
  const departureDate = booking.deparatureData ?? booking.departureDate;
  const href = `/all-destinations/${booking._id}`;

  const handleCancel = async () => {
    const res = await fetch(`${BASE_API_URL}/my-bookings/${booking._id}`,{
        method:'DELETE'
    })
    const result = await res.json()
    console.log(result)

    
 


  };

  return (
    <article className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-4 shadow-[0_1px_1px_rgba(15,23,42,0.06)] sm:flex-row sm:gap-5">
      <Link
        href={href}
        aria-label={`View ${booking.destinationName}`}
        className="relative block h-44 w-full shrink-0 overflow-hidden rounded-sm bg-slate-100 sm:h-[136px] sm:w-[230px]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={booking.destinationName}
            fill
            sizes="(min-width: 640px) 230px, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#e9f7ff] to-slate-100">
            <ImageOff aria-hidden="true" className="size-6 text-slate-300" />
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
            <CheckCircle2
              aria-hidden="true"
              strokeWidth={2.5}
              className="size-3.5"
            />
            {booking.status ?? "Confirmed"}
          </span>

          <h2 className="mt-2 truncate text-[22px] leading-tight font-semibold tracking-[-0.02em] text-slate-950">
            {booking.destinationName}
          </h2>

          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-600">
            <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />
            Departure: {formatDate(departureDate)}
          </p>

          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-600">
            <Tag aria-hidden="true" className="size-3.5 shrink-0" />
            Booking ID: {booking._id}
          </p>

          <p className="mt-3 text-[26px] leading-none font-semibold text-cyan-700">
            {formatPrice(booking.price)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end sm:pb-0.5">
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center">
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="outline"
                    disabled={isCancelling}
                    className="h-9 w-full rounded-sm border-rose-200 bg-white px-4 text-xs font-medium text-rose-500 shadow-none hover:bg-rose-50 hover:text-rose-600 sm:w-auto"
                  >
                    <Trash2 aria-hidden="true" className="size-3.5" />
                    {isCancelling ? "Cancelling..." : "Cancel"}
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your trip to {booking.destinationName} is currently
                    confirmed. This will permanently cancel your reservation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep booking</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancel}>
                    Cancel booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link
              href={href}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-sm bg-cyan-700 px-4 text-xs font-medium text-white transition-colors hover:bg-cyan-800 sm:w-auto"
            >
              <Eye aria-hidden="true" className="size-3.5" />
              View
            </Link>
          </div>

          {error ? (
            <p
              role="alert"
              className="text-[11px] text-rose-600 sm:text-right"
            >
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
