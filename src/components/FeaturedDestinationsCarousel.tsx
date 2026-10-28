"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ImageOff,
  MapPin,
  Star,
} from "lucide-react";
import {
  formatDuration,
  formatPrice,
  type Destination,
} from "@/lib/destinations";

type FeaturedDestinationsCarouselProps = {
  destinations: Destination[];
};

function FeaturedDestinationCard({ destination }: { destination: Destination }) {
  const imageUrl = destination.imageUrl?.trim();
  const href = `/all-destinations/${destination._id}`;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        aria-label={`View ${destination.destinationName}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 640px) 46vw, 82vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#e9f7ff] to-slate-100">
            <ImageOff aria-hidden="true" className="size-6 text-slate-300" />
          </div>
        )}

        {typeof destination.rating === "number" ? (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 bg-white px-2 py-1 text-[10px] font-semibold text-slate-800 shadow-sm">
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

        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 min-w-0 text-sm leading-snug font-medium text-slate-900">
            <Link
              href={href}
              className="transition-colors hover:text-[#1598ff]"
            >
              {destination.destinationName}
            </Link>
          </h3>
          <p className="shrink-0 text-sm leading-snug">
            <span className="font-semibold text-slate-900">
              {formatPrice(destination.price)}
            </span>
            <span className="text-[10px] text-slate-400">/person</span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
          <CalendarDays aria-hidden="true" className="size-3 shrink-0" />
          {formatDuration(destination.duration)}
        </p>

        <Link
          href={href}
          aria-label={`View ${destination.destinationName}`}
          className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1598ff] transition-colors hover:text-[#0d86e8]"
        >
          Book Now
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedDestinationsCarousel({
  destinations,
}: FeaturedDestinationsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;

    return first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
  }, []);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep();
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    const isScrollable = track.scrollWidth > track.clientWidth;
    const stepIndex = step > 0 ? Math.round(track.scrollLeft / step) : 0;

    setActiveIndex(atEnd && isScrollable ? destinations.length - 1 : stepIndex);
    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(!atEnd);
  }, [destinations.length, getStep]);

  useEffect(() => {
    syncScrollState();

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(syncScrollState);
    observer.observe(track);

    return () => observer.disconnect();
  }, [syncScrollState]);

  function scrollBySlide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep();
    const nextLeft = Math.min(
      Math.max(track.scrollLeft + direction * step, 0),
      track.scrollWidth - track.clientWidth,
    );

    track.scrollTo({ left: nextLeft, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="featured-destinations-title"
      className="bg-white px-5 py-14 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <h2
              id="featured-destinations-title"
              className="text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950"
            >
              Featured Destinations
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/all-destinations"
            className="inline-flex items-center gap-3 border border-[#1598ff]/40 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#1598ff] transition-colors hover:border-[#1598ff] hover:bg-[#1598ff] hover:text-white"
          >
            All Destinations
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        <div
          ref={trackRef}
          onScroll={syncScrollState}
          className="mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-2rem)/2.15)]"
            >
              <FeaturedDestinationCard destination={destination} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
          <p
            className="text-xs text-slate-500 tabular-nums"
            aria-live="polite"
            aria-label={`Destination ${Math.min(activeIndex + 1, destinations.length)} of ${destinations.length}`}
          >
            {Math.min(activeIndex + 1, destinations.length)}/{destinations.length}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBySlide(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous featured destinations"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBySlide(1)}
              disabled={!canScrollNext}
              aria-label="Next featured destinations"
              className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
