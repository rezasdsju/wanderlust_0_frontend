import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ImageOff, MapPin, Star } from "lucide-react";
import {
  formatDuration,
  formatPrice,
  type Destination,
} from "@/lib/destinations";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  const imageUrl = destination.imageUrl?.trim();
  const href = `/all-destinations/${destination._id}`;

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        aria-label={`View ${destination.destinationName}`}
        className="relative block aspect-video overflow-hidden rounded-sm bg-slate-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#e9f7ff] to-slate-100">
            <ImageOff aria-hidden="true" className="size-6 text-slate-300" />
          </div>
        )}

        {typeof destination.rating === "number" ? (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm bg-white/95 px-2 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
            {destination.rating.toFixed(1)}
            <Star
              aria-hidden="true"
              className="size-2.5 fill-slate-900 text-slate-900"
            />
          </span>
        ) : null}
      </Link>

      <div className="pt-3">
        <p className="flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin aria-hidden="true" className="size-3 shrink-0" />
          {destination.country}
        </p>

        <div className="mt-1.5 flex items-start justify-between gap-3">
          <h2 className="line-clamp-1 min-w-0 text-sm leading-snug font-medium text-slate-900">
            <Link
              href={href}
              className="transition-colors hover:text-[#1598ff]"
            >
              {destination.destinationName}
            </Link>
          </h2>
          <p className="shrink-0 text-xs leading-snug">
            <span className="font-semibold text-slate-900">
              {formatPrice(destination.price)}
            </span>
            <span className="text-slate-400">/person</span>
          </p>
        </div>

        <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
          <CalendarDays aria-hidden="true" className="size-3 shrink-0" />
          {formatDuration(destination.duration)}
        </p>

        <Link
          href={href}
          aria-label={`View ${destination.destinationName}`}
          className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1598ff] transition-colors hover:text-[#0d86e8]"
        >
          Book Now
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </article>
  );
}
