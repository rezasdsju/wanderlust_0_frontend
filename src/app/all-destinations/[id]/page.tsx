import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import { DeleteDestination } from "@/components/DeleteDestination";
import BookingCard from "@/components/bookings/BookingCard";
import {
  ArrowLeft,
  Ban,
  CalendarDays,
  Check,
  ImageOff,
  MapPin,
  Star,
} from "lucide-react";
import {
  DESTINATIONS_API,
  formatDuration,
  type Destination,
} from "@/lib/destinations";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



const fallbackHighlights = [
  "Handpicked accommodation",
  "Local expert guides",
  "Curated daily experiences",
  "Seamless airport transfers",
  "Flexible booking options",
];

export default async function DestinationDetailPage({
  params,
}: PageProps<"/all-destinations/[id]">) {
  const { id } = await params;


  // const token = await auth.api.getToken({
  //   headers: await headers()
  // })
  // console.log('token: ',token)
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();

  const response = await fetch(`${DESTINATIONS_API}/${id}`, {
    cache: "no-store",
    headers:{
      authorization:'User Logged In'
    }
  });
  if (response.status === 404) notFound();
  if (!response.ok) {
    throw new Error(`Failed to fetch destination (${response.status})`);
  }

  const destination = (await response
    .json()
    .catch(() => null)) as Destination | null;
  if (!destination?._id) notFound();

  const imageUrl = destination.imageUrl?.trim();
  const description =
    destination.description ||
    "More details about this journey are coming soon.";
  const highlights = destination.highlights?.length
    ? destination.highlights
    : fallbackHighlights;

  return (
    <main className="flex-1 bg-white px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/all-destinations"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 transition-colors hover:text-slate-950"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">

            <EditDestinationDialog destination={destination}></EditDestinationDialog>
            <DeleteDestination destination={destination} />
            <Link
              href="/all-destinations"
              className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-rose-200 bg-white px-3 text-[11px] font-medium text-rose-600 transition-colors hover:bg-rose-50"
            >
              <Ban aria-hidden="true" className="size-3" />
              Cancel
            </Link>
          </div>
        </div>

        <div className="relative mt-4 aspect-video overflow-hidden rounded-sm bg-slate-100 sm:aspect-16/5">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${destination.destinationName}, ${destination.country}`}
              fill
              preload
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#e9f7ff] to-slate-100">
              <ImageOff aria-hidden="true" className="size-8 text-slate-300" />
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <article>
            <p className="flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin aria-hidden="true" className="size-3 shrink-0" />
              {destination.country}
            </p>

            <h1 className="mt-1 text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950">
              {destination.destinationName}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
              {typeof destination.rating === "number" ? (
                <span className="flex items-center gap-1">
                  <Star
                    aria-hidden="true"
                    className="size-3 fill-[#1598ff] text-[#1598ff]"
                  />
                  <span className="font-semibold text-slate-900">
                    {destination.rating.toFixed(1)}
                  </span>
                  {typeof destination.reviews === "number" ? (
                    <span>({destination.reviews} reviews)</span>
                  ) : null}
                </span>
              ) : null}

              <span className="flex items-center gap-1">
                <CalendarDays aria-hidden="true" className="size-3 shrink-0" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            <section aria-labelledby="overview-heading" className="mt-6">
              <h2
                id="overview-heading"
                className="text-xl font-medium tracking-[-0.03em] text-slate-950"
              >
                Overview
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-600">
                {description}
              </p>
            </section>

            <section aria-labelledby="highlights-heading" className="mt-6">
              <h2
                id="highlights-heading"
                className="text-xl font-medium tracking-[-0.03em] text-slate-950"
              >
                Highlights
              </h2>
              <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-600"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-3 shrink-0 text-cyan-700"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </article>



<BookingCard destination={destination}></BookingCard>



        </div>
      </div>
    </main>
  );
}
